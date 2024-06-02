import useBooleanStateAuthorized from '../../../../../common/hooks/useBooleanStateAuthorized';
import {
    ObjectType, Position, UUID,
} from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { selectInputOutput } from '../../../../input-outputs/inputOutputs.selectors';
import useWorkflowContext from '../../useWorkflowContext';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface IoContextProviderProps {
    id: UUID
    fsNodeId: UUID
    position: Position
}
export const IoContext = React.createContext({} as IoContextValue);

export function useIoContextCreator({
    id, fsNodeId, position,
}: IoContextProviderProps) {
    const value = useMemo(() => ({
        id,
        fsNodeId,
        ...position,
    }), [id, fsNodeId, position]);
    const [titleEditOpen, openTitleEdit, closeTitleEdit] = useBooleanStateAuthorized(false);

    return {
        IoContext,
        ioContextValue: {
            ...value,
            titleEditOpen,
            openTitleEdit,
            closeTitleEdit,
        },
    };
}

interface IoContextValue extends Position{
    id: UUID
    fsNodeId: UUID
    titleEditOpen: boolean
    openTitleEdit: () => void
    closeTitleEdit: () => void
}

export default function useIoContext() {
    const {
        id, titleEditOpen, fsNodeId, ...position
    } = useContext(IoContext);

    if (!id) {
        throw new Error('useIoContext must be used within IoContext');
    }

    const { branchId } = useWorkflowContext();
    const {
        rootId, title, mainId, flowStepId, flowStepNodeId,
    } = useSelector(selectInputOutput(branchId, id));
    const selectedObject = useSelector(selectSelectedObject);
    const isSelected = id === selectedObject?.objectId;
    let selectedNodeId;

    if (selectedObject?.objectType === ObjectType.Node) {
        selectedNodeId = selectedObject.objectId;
    }

    const isNodeSelected = selectedObject?.metadata?.inputIds?.includes(id);

    return {
        id,
        rootId,
        mainId,
        title,
        isSelected,
        selectedNodeId,
        isNodeSelected,
        titleEditOpen,
        fsNodeId,
        flowStepId,
        flowStepNodeId,
        ...position,
    };
}
