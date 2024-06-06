import { UUID } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectMainObjectThreadByObjectId, selectThreadCommentsLength } from '../../../comments/comments.selectors';
import { faComment } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    id: UUID;
    mr?: number;
    ml?: number;
    mt?: number;
    mb?: number;
    justifyContent?: 'start' | 'center' | 'end';
    width?: number;
}

export default function ObjectCommentsBadge({
    id, ml = 0, mr = 0, mt = 0, mb = 0, justifyContent = 'start', width,
}: Props) {
    const { branchId } = useBranchContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, id));
    const length = useSelector(selectThreadCommentsLength(threadId));

    if (!length) return null;

    return (
        <Box
            className="CommentBadge"
            sx={{
                justifyContent,
                height: 32,
                mt,
                ml,
                mr,
                mb,
                width,
            }}>
            <Tooltip title="Comments" placement="top">
                <div className="CommentBadge" style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faComment} />
                    <span className="Count">{length}</span>
                </div>
            </Tooltip>
        </Box>
    );
}
