import Loader from '../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../store';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import UserProfileLink from '../../../users/components/UserProfileLink';
import { maybeSelectNode } from '../../nodes.selectors';
import { getEditors } from '../../nodes.thunks';
import {
    Box, Chip, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Editors() {
    const { branchId, nodeId } = useBranchContext();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const editorIds = node?.editorIds;
    const [fetched, setFetched] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (!fetched && node) {
            dispatch(getEditors({
                branchId,
                id: nodeId,
            })).then(() => setFetched(true));
        }
    }, [branchId, dispatch, fetched, node, nodeId]);

    if (!fetched) {
        return <Loader />;
    }

    if (!node) {
        return null;
    }

    return (
        <Box p={4} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary">
                Editors
                <Chip color="button" label={node.editorIds?.size || '0'} size="small" sx={{ ml: 1 }} />
            </Typography>
            {editorIds && Array.from(editorIds).map((id) => (
                <UserProfileLink key={id} id={id} mt={4} />
            ))}
        </Box>
    );
}
