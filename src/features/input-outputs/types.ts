import { UUID } from '../../types';
import { Property } from '../properties/types';

export interface InputOutput {
    // primary key
    rootNodeId: UUID;
    nodeId: UUID;
    id: UUID;
    // other fields
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

export interface InputOutputSlice {
    byId: Record<UUID, InputOutput>,
    IOPaneContent: 'markdown' | 'description' | 'editor',
}
