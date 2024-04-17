import { UUID } from '../../types';
import { Property } from '../properties/types';

export interface InputOutputPrimaryKey {
    rootId: UUID;
    nodeId: UUID;
    branchId: UUID;
    id: UUID;
}

/**
 * @description
 *  InputOutputs are branched differently than other objects in the system.
 *  While others use node_id -> branch_id relationship, InputOutputs use root_id -> branch_id.
 */
export interface InputOutput extends InputOutputPrimaryKey {
    mainId: UUID;
    flowId: UUID | null;
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
    flowId: InputOutput['flowId'];
    mainId?: InputOutput['mainId'];
    title: InputOutput['title'];
}

export interface UpdateIoTitlePayload extends InputOutputPrimaryKey {
    mainId: InputOutput['mainId'];
    title: InputOutput['title'];
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
