import Loader from '../../../../../common/components/Loader';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import Workflow from '../../../../workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../../workflows/constants';
import { showWorkflow } from '../../../../workflows/worfklow.thunks';
import { selectSelected } from '../../../nodes.selectors';
import { PKWithTreeBranch } from '../../../nodes.types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NodePaneWorkflow() {
    const { id } = useSelector(selectSelected) as PKWithTreeBranch;
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (!loading) {
            setLoading();
            dispatch(showWorkflow(id))
                .then(() => {
                    unsetLoading();
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }, [dispatch, id, loading, setLoading, unsetLoading]);

    if (!id) return null;

    if (loading) {
        return <Loader />;
    }

    return (
        <Workflow nodeId={id} context={WorkflowDiagramContext.treeNodeDetails} />
    );
}
