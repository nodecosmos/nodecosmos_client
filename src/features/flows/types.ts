import { UUID } from '../../types';

export interface Flow {
    // primary key
    nodeId: UUID;
    workflowId: UUID;
    startIndex: number;
    verticalIndex: number;
    id: UUID;
    // other fields
    title: string;
    description: string;
    descriptionMarkdown: string;
    createdAt: Date;
    updatedAt: Date;
}

// eslint-disable-next-line no-shadow
export enum FlowPaneContent {
    Description = 'description',
    Markdown = 'markdown',
    Editor = 'editor',
}

export interface FlowState {
    byId: Record<UUID, Flow>
    flowPaneContent: FlowPaneContent;
}
