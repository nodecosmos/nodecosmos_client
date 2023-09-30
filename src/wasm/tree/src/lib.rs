use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::{from_value, Serializer, to_value};

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

const MARGIN_LEFT: f32 = 20.0;
// move children's edge lef
const EDGE_LENGTH: f32 = 35.0;
// length of edge (link)
const COMPLETE_Y_LENGTH: f32 = 50.05;

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
struct Node {
    #[serde(rename = "treeNodeId")]
    tree_node_id: String,

    #[serde(rename = "treeParentId")]
    tree_parent_id: Option<String>,

    #[serde(rename = "treeUpperSiblingId")]
    tree_upper_sibling_id: Option<String>,

    #[serde(rename = "treeAncestorIds")]
    tree_ancestor_ids: Vec<String>,

    #[serde(rename = "treeSiblingIndex")]
    tree_sibling_index: usize,

    #[serde(rename = "treeChildIds")]
    tree_child_ids: Vec<String>,

    #[serde(rename = "treeDescendantIds")]
    tree_descendant_ids: Vec<String>,

    #[serde(rename = "treeLastChildId")]
    tree_last_child_id: Option<String>,

    #[serde(rename = "nodeId")]
    node_id: String,

    #[serde(rename = "rootId")]
    root_id: String,

    #[serde(rename = "isRoot")]
    is_root: bool,

    #[serde(rename = "isMounted")]
    is_mounted: bool,

    #[serde(rename = "isExpanded")]
    is_expanded: bool,

    #[serde(rename = "isEditing")]
    is_editing: bool,

    #[serde(rename = "isNewlyCreated")]
    is_newly_created: bool,

    #[serde(rename = "nestedLevel")]
    nested_level: usize,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
struct Position {
    x: f32,
    y: f32,
    xEnd: f32,
    yEnd: f32,
}

// Test project that calculates the position of nodes in the tree.
// However, for this use-case performance is better when the tree is calculated in vanilla JS.
// Reason is serialization and deserialization of data.
#[wasm_bindgen]
pub fn calculate_position(
    ordered_tree_node_ids: JsValue,
    tree_nodes: JsValue,
) -> JsValue {
    let ordered_tree_node_ids: Vec<String> = from_value(ordered_tree_node_ids).unwrap();
    let tree_nodes: HashMap<String, Node> = from_value(tree_nodes).unwrap();

    let mut current_positions_by_id: HashMap<String, Position> = HashMap::with_capacity(1000);

    for id in ordered_tree_node_ids {
        let node = tree_nodes.get(&id).unwrap();

        let null_id = "null".to_string();

        let parent_id = node.tree_parent_id.as_ref().unwrap_or(&null_id);
        let parent_position = current_positions_by_id.get(parent_id);

        let upper_sibling_id = node.tree_upper_sibling_id.as_ref().unwrap_or(&null_id);
        let upper_sibling_position = current_positions_by_id.get(upper_sibling_id);

        let Position { x: parent_x, y: parent_y, .. } = parent_position.unwrap_or(&Position { x: 0.0, y: 0.0, xEnd: 0.0, yEnd: 0.0 });
        let upper_sibling_y_end = upper_sibling_position.unwrap_or(&Position { x: 0.0, y: 0.0, xEnd: 0.0, yEnd: 0.0 }).yEnd;

        let x = parent_x + MARGIN_LEFT + EDGE_LENGTH;
        let y = if upper_sibling_y_end == 0.0 {
            parent_y + COMPLETE_Y_LENGTH
        } else {
            upper_sibling_y_end + COMPLETE_Y_LENGTH
        };

        let x_end = x + EDGE_LENGTH;

        let position = Position { x, y, xEnd: x_end, yEnd: y };

        if node.is_mounted {
            node.tree_ancestor_ids.iter().for_each(|ancestor_id| {
                current_positions_by_id.get_mut(ancestor_id).unwrap().yEnd += COMPLETE_Y_LENGTH;
            });
        }

        current_positions_by_id.insert(id, position);
    }

    return to_value(&current_positions_by_id).unwrap();
}

#[derive(Debug, Clone)]
struct StackItem {
    node_id: String,
    tree_node_id: String,
    parent_id: Option<String>,
    tree_parent_id: Option<String>,
    tree_upper_sibling_id: Option<String>,
    tree_ancestor_ids: Vec<String>,
    tree_sibling_index: usize,
    nested_level: usize,
}

#[wasm_bindgen]
pub fn build_tree(
    child_ids_by_parent_id: JsValue,
    root_id: JsValue,
    tree_type: JsValue,
    tree_nodes: JsValue,
) -> JsValue {
    let now = js_sys::Date::now();

    let child_ids_by_parent_id: HashMap<String, Vec<String>> = from_value(child_ids_by_parent_id).unwrap();
    let root_id: String = from_value(root_id).unwrap();
    let tree_type: String = from_value(tree_type).unwrap();

    let mut tree_nodes: HashMap<String, Node> = from_value(tree_nodes).unwrap();
    let mut ordered_tree_node_ids: Vec<String> = Vec::new();


    let elapsed = js_sys::Date::now() - now;

    web_sys::console::log_2(&"wasm deserialization took: ".into(), &elapsed.into());

    let now = js_sys::Date::now();

    let mut stack = vec![StackItem {
        node_id: root_id.clone(),
        tree_node_id: root_id.clone(),
        parent_id: None,
        tree_parent_id: None,
        tree_upper_sibling_id: None,
        tree_ancestor_ids: Vec::new(),
        tree_sibling_index: 0,
        nested_level: 0,
    }];

    while let Some(item) = stack.pop() {
        let child_ids = child_ids_by_parent_id.get(&item.node_id).unwrap();
        let is_root = item.node_id == root_id;
        let is_newly_created = tree_nodes.get(&item.node_id).is_some();
        let parent_id = item.parent_id.as_ref().unwrap_or(&root_id);
        let parent_node = tree_nodes.get(parent_id);
        let current_node = tree_nodes.get(&item.node_id);
        let (is_parent_expanded, is_parent_mounted) = parent_node.map_or((false, false), |n| (n.is_expanded, n.is_mounted));
        let mut current_tree_node = Node {
            tree_node_id: item.tree_node_id.clone(),
            tree_parent_id: item.tree_parent_id,
            tree_upper_sibling_id: item.tree_upper_sibling_id,
            tree_ancestor_ids: item.tree_ancestor_ids.clone(),
            tree_sibling_index: item.tree_sibling_index,
            tree_child_ids: Vec::with_capacity(child_ids.len()),
            tree_descendant_ids: Vec::new(),
            tree_last_child_id: None,
            node_id: item.node_id.clone(),
            root_id: root_id.clone(),
            is_root,
            is_mounted: is_root || is_newly_created || (is_parent_expanded && is_parent_mounted),
            is_expanded: current_node.map_or(false, |n| n.is_expanded) || is_root || tree_type == "checkbox",
            is_editing: is_newly_created,
            is_newly_created,
            nested_level: item.nested_level,
        };

        ordered_tree_node_ids.push(item.tree_node_id.clone());


        for (i, child_id) in child_ids.iter().enumerate().rev() {
            let child_tree_node_id = format!("{}->{}->{}", root_id, item.node_id, child_id);

            current_tree_node.tree_child_ids.push(child_tree_node_id.clone());

            if i == child_ids.len() - 1 {
                current_tree_node.tree_last_child_id = Some(child_tree_node_id.clone());
            }

            let tree_upper_sibling_id = if i > 0 {
                Some(format!("{}->{}->{}", root_id, item.node_id, child_ids[i - 1]))
            } else {
                None
            };

            stack.push(StackItem {
                node_id: child_id.clone(),
                tree_node_id: child_tree_node_id,
                parent_id: Some(item.node_id.clone()),
                tree_parent_id: Some(item.tree_node_id.clone()),
                tree_upper_sibling_id,
                tree_ancestor_ids: {
                    let mut ancestors = item.tree_ancestor_ids.clone();
                    ancestors.push(item.tree_node_id.clone());
                    ancestors
                },
                tree_sibling_index: i,
                nested_level: item.nested_level + 1,
            });
        }

        tree_nodes.insert(item.tree_node_id.clone(), current_tree_node);


        for ancestor_id in &item.tree_ancestor_ids {
            tree_nodes.get_mut(ancestor_id).unwrap().tree_descendant_ids.push(item.tree_node_id.clone());
        }
    }

    let elapsed = js_sys::Date::now() - now;

    web_sys::console::log_2(&"wasm Calculating tree took: ".into(), &elapsed.into());

    let now = js_sys::Date::now();

    let result = (tree_nodes, ordered_tree_node_ids);
    let serializer = Serializer::new().serialize_maps_as_objects(true);
    let res = result.serialize(&serializer).unwrap();
    let res = res.dyn_into::<js_sys::Object>().unwrap();
    let res = res.into();

    let elapsed = js_sys::Date::now() - now;
    web_sys::console::log_2(&"wasm Serializing response: ".into(), &elapsed.into());

    return res
}
