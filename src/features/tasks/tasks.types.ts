/*
* #[charybdis_model(
    table_name = tasks,
    partition_keys = [branch_id],
    clustering_keys = [node_id, id],
)]
#[derive(Serialize, Deserialize, Clone, Default)]
#[serde(rename_all = "camelCase")]
pub struct Task {
    pub branch_id: Uuid,
    pub node_id: Uuid,
    pub id: Uuid,
    pub section_id: Uuid,
    pub order_index: Double,
    pub author_id: Uuid,
    pub author: Profile,
    pub assignee_ids: List<Uuid>,
    pub assignees: Frozen<List<Frozen<Profile>>>,
    pub created_at: Timestamp,
    pub updated_at: Timestamp,
    pub completed_at: Option<Timestamp>,
}
*
*#[charybdis_model(
    table_name = task_sections,
    partition_keys = [branch_id],
    clustering_keys = [node_id, id],
)]
#[derive(Serialize, Deserialize, Default, Clone)]
#[serde(rename_all = "camelCase")]
pub struct TaskSection {
    pub branch_id: Uuid,
    pub node_id: Uuid,
    pub id: Uuid,
    pub order_index: SmallInt,
    pub created_at: Timestamp,
    pub updated_at: Timestamp,
}
 */

import { Profile, UUID } from '../../types';

export interface TaskPrimaryKey {
    branchId: UUID;
    nodeId: UUID;
    id: UUID;
}

export interface Task extends TaskPrimaryKey {
    title: string;
    sectionId: UUID;
    orderIndex: number;
    authorId: UUID;
    author: Profile;
    assigneeIds: UUID[];
    assignees: Profile[];
    createdAt: Date;
    updatedAt: Date;
    dueAt?: Date | null;
    completedAt?: Date | null;
}

export interface TaskSectionPrimaryKey {
    branchId: UUID;
    nodeId: UUID;
    id: UUID;
}

export interface TaskSection extends TaskSectionPrimaryKey {
    title: string;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskState {
    sectionsByNode: Record<UUID, TaskSection[]>;
    // TODO: no need to store tasks, just their ids
    tasksBySection: Record<UUID, Task[]>;
    taskById: Record<UUID, Task>;
}
