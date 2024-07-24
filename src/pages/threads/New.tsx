import Alert from '../../common/components/Alert';
import { setAlert } from '../../features/app/appSlice';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { CreateCommentResponse } from '../../features/comments/comments.thunks';
import { ThreadLocation, ThreadObjectType } from '../../features/comments/comments.types';
import CommentEditor from '../../features/comments/components/CommentEditor';
import { NodecosmosDispatch } from '../../store';
import { faComments } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, TextField, Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function New() {
    const {
        originalId: rootId, branchId, nodeId,
    } = useBranchContext();
    const navigate = useNavigate();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleClose = useCallback((response?: CreateCommentResponse) => {
        if (response) {
            const { thread } = response;
            if (thread) {
                navigate(`/nodes/${branchId}/${nodeId}/threads/${thread.id}`);
                setTimeout(() => dispatch(setAlert({
                    isOpen: true,
                    severity: 'success',
                    message: 'Thread successfully created!',
                })), 10);
            } else {
                throw new Error('Thread not found');
            }
        } else {
            navigate(`/nodes/${branchId}/${nodeId}/threads`);
        }
    }, [branchId, dispatch, navigate, nodeId]);
    const [title, setTitle] = React.useState('');
    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);
    const newThread = useMemo(() => ({
        rootId,
        title,
        branchId,
        objectId: nodeId,
        objectType: ThreadObjectType.Thread,
        threadLocation: ThreadLocation.Thread,
    }), [rootId, title, branchId, nodeId]);

    return (
        <Box py={4} height={1} className="overflow-auto">
            <Container maxWidth="md">
                <Alert position="relative" mb={2} maxWidth={780} />
                <Typography variant="h5" color="text.secondary">
                    <FontAwesomeIcon icon={faComments} />
                    <Box component="span" ml={2}>New Thread</Box>
                </Typography>
                <Box display="flex" alignItems="center" mt={2} maxWidth={780}>
                    <TextField
                        className="InputFieldWithLabel"
                        fullWidth
                        name="title"
                        label="Title"
                        InputProps={{ autoComplete: 'off' }}
                        onChange={handleTitleChange}
                        required
                    />
                </Box>
                <Box mt={2}>
                    <CommentEditor
                        autoFocus={false}
                        newThread={newThread}
                        info="Start a conversation about current node."
                        onClose={handleClose}
                    />
                </Box>
            </Container>
        </Box>
    );
}
