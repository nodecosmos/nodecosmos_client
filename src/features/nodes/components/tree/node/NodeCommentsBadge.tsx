import useBranchContext from '../../../../branch/hooks/useBranchContext';
import {
    selectMainObjectThreadByObjectId,
    selectThreadCommentsLength,
} from '../../../../comments/comments.selectors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { faComment } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function NodeCommentsBadge() {
    const { branchId } = useBranchContext();
    const { id } = useNodeContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, id));
    const length = useSelector(selectThreadCommentsLength(threadId));
    const { size } = useTreeContext();
    const style = useMemo(() => ({
        height: size.height,
        marginLeft: 8,
    }), [size.height]);

    if (!length) return null;

    return (
        <div style={style}>
            <Tooltip title="Comments" placement="top">
                <div className="CountBadge" style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faComment} />
                    <span className="Count">{length}</span>
                </div>
            </Tooltip>
        </div>
    );
}
