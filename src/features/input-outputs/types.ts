import { UUID } from '../../types';
import { Property } from '../properties/types';

export interface PrimaryKey {
    rootNodeId: UUID;
    nodeId: UUID;
    workflowId: UUID;
    id: UUID;
}

export interface InputOutput extends PrimaryKey {
    originalId: UUID | null;
    flowStepId: UUID | null;
    title: string;
    unit: string | null;
    dataType: string | null;
    value: string | null;
    description: string | null;
    descriptionMarkdown: string | null;
    properties: Property[];
    createdAt: Date;
    updatedAt: Date;

}

export interface InsertInputOutputPayload {
    rootNodeId: PrimaryKey['rootNodeId'];
    nodeId: PrimaryKey['nodeId'];
    workflowId: PrimaryKey['workflowId'];
    flowStepId: InputOutput['flowStepId'];
    originalId?: InputOutput['originalId'];
    title: InputOutput['title'];
}

export interface UpdateIOTitlePayload extends PrimaryKey {
    originalId: InputOutput['originalId'];
    title: InputOutput['title'];
}

export interface UpdateIODescriptionPayload extends PrimaryKey {
    originalId: InputOutput['originalId'];
    description: InputOutput['description'];
    descriptionMarkdown: InputOutput['descriptionMarkdown'];
}

export enum IOPaneContent {
    Markdown = 'markdown',
    Description = 'description',
    Editor = 'editor',
}

export interface InputOutputSlice {
    byId: Record<UUID, InputOutput>,
    IOPaneContent: IOPaneContent,
}
