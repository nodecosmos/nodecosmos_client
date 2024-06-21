import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { CreateIoModalProps, IoObjectType } from '../components/CreateIoModal';
import { selectUniqueIoByRootId } from '../inputOutputs.selectors';
import { createIo } from '../inputOutputs.thunks';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TitleProps {
    setTitleFromList: (value: string | null) => void;
}

type Props = CreateIoModalProps & TitleProps;

export default function useIoSubmitHandler(props: Props) {
    const {
        associatedObject,
        flowStepPrimaryKey,
        flowStepNodeId,
        setTitleFromList,
        onClose,
    } = props;
    const { nodeId, rootId } = useWorkflowContext();
    const { branchId } = useBranchContext();
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const allWorkflowIos = useSelector(selectUniqueIoByRootId(branchId, rootId));
    const handleServerError = useHandleServerErrorAlert();

    const onSubmit = useCallback(async (formValues: { title: string }) => {
        setLoading(true);
        const { title } = formValues;
        const existingIo = title ? allWorkflowIos.find((io) => io.title === title) : null;

        const payload = {
            nodeId,
            branchId,
            rootId,
            mainId: (title && existingIo?.id) || nodeId,
            flowId: flowStepPrimaryKey?.flowId ?? null,
            flowStepId: flowStepPrimaryKey?.id ?? null,
            flowStepNodeId: flowStepNodeId ?? null,
            initialInput: associatedObject === IoObjectType.startStep,
            ...formValues,
        };

        const response = await dispatch(createIo(payload));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }

        setTimeout(() => {
            setLoading(false);
            setTitleFromList(null);
        }, 500);

        onClose();
    },
    [
        allWorkflowIos, associatedObject, branchId, dispatch, flowStepPrimaryKey?.flowId, flowStepNodeId,
        flowStepPrimaryKey?.id,
        handleServerError, nodeId, rootId, setTitleFromList, onClose,
    ]);

    return useMemo(() => ({
        onSubmit,
        loading,
    }), [onSubmit, loading]);
}
