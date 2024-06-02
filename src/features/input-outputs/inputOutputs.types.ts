import { UUID } from '../../types';
import { Property } from '../properties/types';

export interface InputOutputPrimaryKey {
    rootId: UUID;
    branchId: UUID;
    id: UUID;
}

/**
 * @description
 *  InputOutputs are branched differently than other objects in the system.
 *  While others use node_id -> branch_id relationship, InputOutputs use root_id -> branch_id.
 */
export interface InputOutput extends InputOutputPrimaryKey {
    nodeId: UUID;
    mainId: UUID;
    flowId: UUID | null;
    initialInput: boolean;
    flowStepId: UUID | null;
    flowStepNodeId: UUID | null;
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
    nodeId: InputOutput['nodeId'];
    flowStepId: InputOutput['flowStepId'];
    flowStepNodeId: InputOutput['flowStepNodeId'];
    flowId: InputOutput['flowId'];
    mainId?: InputOutput['mainId'];
    title: InputOutput['title'];
    initialInput: InputOutput['initialInput'];
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
