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
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();
            dispatch(showWorkflow(id)).then(() => {
                setFetched();
                setTimeout(unsetLoading, 250);
            });
        }

        return () => {
            if (!loading && fetched) {
                unsetFetched();
            }
        };
    }, [dispatch, fetched, id, loading, setFetched, setLoading, unsetFetched, unsetLoading]);

    if (!id) return null;

    if (loading) {
        return <Loader />;
    }

    return (
        <Workflow nodeId={id} context={WorkflowDiagramContext.treeNodeDetails} />
    );
}
