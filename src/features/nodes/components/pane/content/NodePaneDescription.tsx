import Loader from '../../../../../common/components/Loader';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import { selectSelected, selectSelectedNode } from '../../../nodes.selectors';
import { getDescription } from '../../../nodes.thunks';
import NodePaneCoverImage from '../../cover/NodePaneCoverImage';
import { Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NodePaneDescription() {
    const selectedPk = useSelector(selectSelected);

    if (!selectedPk) {
        throw new Error('NodePaneContent: selected node is required');
    }

    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        rootId, isTmp, description,
    } = useSelector(selectSelectedNode);
    const {
        treeBranchId, branchId, id,
    } = selectedPk;
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

    useEffect(() => {
        if (id && rootId && !isTmp && !description && !loading) {
            setLoading();
            dispatch(getDescription({
                treeBranchId,
                branchId,
                id,
            })).finally(() => {
                setTimeout(unsetLoading, 250);
            });
        }
    }, [branchId, description, dispatch, id, isTmp, loading, rootId, setLoading, treeBranchId, unsetLoading]);

    if (loading) {
        return <Loader />;
    }

    const blankDescription = (
        <Typography color="text.secondary">
            This node has no description yet.
        </Typography>
    );

    return (
        <Box px={4}>
            <NodePaneCoverImage />
            {
                description
                    ? (
                        <Box display="flex" justifyContent="center">
                            <Box
                                mt={2}
                                maxWidth={850}
                                className="DescriptionHTML"
                                dangerouslySetInnerHTML={{ __html: description }} />
                        </Box>
                    )
                    : blankDescription
            }
        </Box>
    );
}
