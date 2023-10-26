import { OptionalId, UUID } from '../../types';
import { Property } from '../properties/types';

export interface PrimaryKey {
    rootNodeId: UUID;
    nodeId: UUID;
    workflowId: UUID;
    id: UUID;
}

export interface InputOutput extends PrimaryKey {
    originalId: UUID;
    flowStepId: UUID;
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

// primary key with optional id + partial of the rest
export type InputOutputUpsertPayload = OptionalId<PrimaryKey> & Partial<Omit<InputOutput, keyof PrimaryKey>>;

export enum IOPaneContent {
    Markdown = 'markdown',
    Description = 'description',
    Editor = 'editor',
}

export interface InputOutputSlice {
    byId: Record<UUID, InputOutput>,
    IOPaneContent: IOPaneContent,
}
