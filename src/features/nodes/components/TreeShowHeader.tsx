import { NodecosmosTheme } from '../../../themes/type';
import { UUID } from '../../../types';
import { setTransformablePositions } from '../../app/appSlice';
import { MARGIN_TOP } from '../../trees/trees.constants';
import { extractNodeIdFromTreeNodeId, extractRootIdFromTreeNodeId } from '../../trees/trees.memoize';
import { selectPositions, selectSelectedTreeNode } from '../../trees/trees.selectors';
import { selectBranchTitles, selectSelectedNode } from '../selectors';
import { setSelectedNode } from '../slice';
import { faChevronRight, faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Breadcrumbs, IconButton, Link, Tooltip, useTheme, Box,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TreeShowHeader() {
    const selectedNode = useSelector(selectSelectedNode);
    const { branchId } = selectedNode || {};
    const nodeTitlesById = useSelector(selectBranchTitles(branchId));
    const selectedTreeNode = useSelector(selectSelectedTreeNode);
    const rootId = selectedTreeNode?.treeNodeId && extractRootIdFromTreeNodeId(selectedTreeNode.treeNodeId);
    const positionsById = useSelector(selectPositions(rootId));
    const dispatch = useDispatch();

    const items: { id: UUID; treeNodeId: UUID; title?: string; }[] = [];

    if (selectedTreeNode && selectedTreeNode.treeAncestorIds) {
        const treeAncestorIds = [...selectedTreeNode.treeAncestorIds];

        treeAncestorIds.forEach((treeNodeId, index) => {
            const nodeId = extractNodeIdFromTreeNodeId(treeNodeId);

            if (nodeTitlesById && nodeTitlesById[nodeId]) {
                items.push(
                    {
                        id: nodeId,
                        treeNodeId: selectedTreeNode.treeAncestorIds[index],
                        title: nodeTitlesById[nodeId],
                    },
                );
            }
        });
    }

    const isSelectedNodeAlreadyInBreadcrumbs = items.some((item) => item.id === selectedNode?.id);
    if (nodeTitlesById && selectedNode && !isSelectedNodeAlreadyInBreadcrumbs && isSelectedNodeAlreadyInBreadcrumbs) {
        items.push({
            id: selectedNode.id,
            treeNodeId: selectedTreeNode.treeNodeId,
            title: nodeTitlesById[selectedNode.id],
        });
    }

    const handleClick = useCallback((id: UUID) => {
        dispatch(setSelectedNode({ id, branchId: id }));
    }, [dispatch]);

    const handleCentering = useCallback((treeNodeId: UUID) => {
        const { y } = positionsById[treeNodeId];
        const scrollTop = y - MARGIN_TOP * 2;
        dispatch(setTransformablePositions({ id: selectedNode?.rootId, scrollTop }));
    }, [dispatch, positionsById, selectedNode?.rootId]);

    const theme: NodecosmosTheme = useTheme();
    const nestedLevelColors = theme.palette.tree.backgrounds;

    if (!selectedNode?.id) return null;

    return (
        <Box sx={{
            width: 1,
            overflowX: 'auto',
            '::-webkit-scrollbar': { height: 6 },
            '::-webkit-scrollbar-thumb': {
                borderRadius: 2,
                maxWidth: '42px',
            },
        }}
        >
            <Breadcrumbs
                maxItems={5}
                itemsAfterCollapse={2}
                itemsBeforeCollapse={2}
                aria-label="breadcrumb"
                separator={<FontAwesomeIcon icon={faChevronRight} />}
            >
                {items.map((item, index) => (
                    <div
                        className="BreadcrumbItem"
                        key={item.id}
                    >
                        <Link onClick={() => handleClick(item.id)} variant="body2">
                            {item.title}
                        </Link>
                        <Tooltip title="reveal" placement="top">
                            <IconButton
                                size="small"
                                className="tools"
                                onClick={() => handleCentering(item.treeNodeId)}
                                sx={{
                                    '&:hover': {
                                        color: nestedLevelColors[index % 3],
                                    },
                                }}
                            >
                                <FontAwesomeIcon icon={faCircle} />
                            </IconButton>
                        </Tooltip>
                    </div>
                ))}
            </Breadcrumbs>
        </Box>
    );
}
