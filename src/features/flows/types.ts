import { WithOptionalId, UUID } from '../../types';

export interface FlowPrimaryKey {
    nodeId: UUID;
    workflowId: UUID;
    verticalIndex: number;
    startIndex: number;
    id: UUID;
}

export interface Flow extends FlowPrimaryKey {
    title: string;
    description: string | null;
    descriptionMarkdown: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// primary key with optional id + partial of the rest
export type FlowUpsertPayload = WithOptionalId<FlowPrimaryKey> & Partial<Omit<Flow, keyof FlowPrimaryKey>>;

export enum FlowPaneContent {
    Description = 'description',
    Markdown = 'markdown',
    Editor = 'editor',
}

export interface FlowState {
    byId: Record<UUID, Flow>
    flowPaneContent: FlowPaneContent;
}
