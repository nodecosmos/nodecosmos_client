import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { CreateCommentResponse } from '../../features/comments/comments.thunks';
import { ThreadLocation, ThreadObjectType } from '../../features/comments/comments.types';
import CommentEditor from '../../features/comments/components/CommentEditor';
import { faComments } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, TextField, Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function New() {
    const { branchId, nodeId } = useBranchContext();
    const navigate = useNavigate();
    const handleClose = useCallback((response?: CreateCommentResponse) => {
        if (response) {
            const { thread } = response;
            if (thread) {
                navigate(`/nodes/${branchId}/${nodeId}/threads/${thread.id}`);
            } else {
                throw new Error('Thread not found');
            }
        } else {
            navigate(`/nodes/${branchId}/${nodeId}/threads`);
        }
    }, [branchId, navigate, nodeId]);
    const [title, setTitle] = React.useState('');
    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    return (
        <Box m={4}>
            <Container>
                <Typography variant="h5" color="text.secondary">
                    <FontAwesomeIcon icon={faComments} />
                    <Box component="span" ml={2}>New Thread</Box>
                </Typography>
                <Box display="flex" alignItems="center" mt={2} width={780}>
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
                        newThread={{
                            title,
                            branchId,
                            objectId: branchId,
                            objectType: ThreadObjectType.Thread,
                            threadLocation: ThreadLocation.Thread,
                        }}
                        info="Start a conversation about this contribution request"
                        onClose={handleClose}
                    />
                </Box>
            </Container>
        </Box>
    );
}
