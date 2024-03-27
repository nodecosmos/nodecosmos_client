import { UUID } from '../../types';
import { Property } from '../properties/types';

export interface InputOutputPrimaryKey {
    rootNodeId: UUID;
    nodeId: UUID;
    branchId: UUID;
    workflowId: UUID;
    id: UUID;
}

export interface InputOutput extends InputOutputPrimaryKey {
    originalId: UUID | null;
    flowStepId: UUID | null;
    title: string;
    unit: string | null;
    dataType: string | null;
    value: string | null;
    description: string | null;
    descriptionMarkdown: string | null;
    properties: Property[];
    createdAt: string;
    updatedAt: string;

}

export interface InsertInputOutputPayload extends Omit<InputOutputPrimaryKey, 'id'> {
    flowStepId: InputOutput['flowStepId'];
    originalId?: InputOutput['originalId'];
    title: InputOutput['title'];
}

export interface UpdateIoTitlePayload extends InputOutputPrimaryKey {
    originalId: InputOutput['originalId'];
    title: InputOutput['title'];
}

export interface UpdateIoDescriptionPayload extends InputOutputPrimaryKey {
    originalId: InputOutput['originalId'];
    description: InputOutput['description'];
    descriptionMarkdown: InputOutput['descriptionMarkdown'];
}

export enum IoPaneContent {
    Markdown = 'markdown',
    Description = 'description',
    Editor = 'editor',
}

export interface InputOutputSlice {
    byBranchId: Record<UUID, Record<UUID, InputOutput>>,
    IoPaneContent: IoPaneContent,
}
