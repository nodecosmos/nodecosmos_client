import { UUID } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectMainObjectThreadByObjectId, selectThreadCommentsLength } from '../../../comments/comments.selectors';
import { faComment } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    id: UUID;
    mr?: number;
    ml?: number;
    mt?: number;
    mb?: number;
    justifyContent?: 'start' | 'center' | 'end';
    width?: number | 'auto';
}

export default function ObjectCommentsBadge({
    id, ml = 0, mr = 0, mt = 0, mb = 0, justifyContent = 'start', width,
}: Props) {
    const { branchId } = useBranchContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, id));
    const length = useSelector(selectThreadCommentsLength(threadId));
    const sxMemo = useMemo(() => ({
        justifyContent,
        height: 32,
        mt,
        ml,
        mr,
        mb,
        width,
    }), [justifyContent, mt, ml, mr, mb, width]);

    if (!length) return null;

    return (
        <Box className="CountBadge" sx={sxMemo}>
            <Tooltip title="Comments" placement="top">
                <div className="CountBadge">
                    <FontAwesomeIcon icon={faComment} />
                    <span className="Count">{length}</span>
                </div>
            </Tooltip>
        </Box>
    );
}
