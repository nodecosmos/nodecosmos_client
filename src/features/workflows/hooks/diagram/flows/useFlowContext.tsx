import useBooleanStateAuthorized from '../../../../../common/hooks/useBooleanStateAuthorized';
import { UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { selectFlow } from '../../../../flows/flows.selectors';
import useWorkflowContext from '../../useWorkflowContext';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface FlowContextValue {
    id: UUID
    titleEditOpen: boolean
    openTitleEdit: () => void
    closeTitleEdit: () => void
}

export const FlowContext = React.createContext({} as FlowContextValue);

export function useFlowContextCreator({ id }: { id: UUID }) {
    const value = useMemo(() => ({ id }), [id]);
    const [titleEditOpen, openTitleEdit, closeTitleEdit] = useBooleanStateAuthorized(false);

    return useMemo(() => ({
        FlowContext,
        flowContextValue: {
            ...value,
            titleEditOpen,
            openTitleEdit,
            closeTitleEdit,
        },
    }), [value, titleEditOpen, openTitleEdit, closeTitleEdit]);
}

export default function useFlowContext() {
    const { id, titleEditOpen } = useContext(FlowContext);
    const { branchId } = useWorkflowContext();
    const {
        nodeId,
        startIndex,
        verticalIndex,
        title,
    } = useSelector(selectFlow(branchId, id));
    const selectedObject = useSelector(selectSelectedObject);

    return useMemo(() => ({
        nodeId,
        startIndex,
        verticalIndex,
        id,
        title,
        isSelected: id === selectedObject?.objectId,
        titleEditOpen,
    }), [nodeId, startIndex, verticalIndex, id, title, selectedObject, titleEditOpen]);
}
