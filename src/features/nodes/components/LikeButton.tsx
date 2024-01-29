import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import abbreviateNumber from '../../../utils/abbreviateNumber';
import { setAlert } from '../../app/appSlice';
import { selectBranchLikes } from '../../likes/likes.selectors';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { LikeType } from '../../likes/types';
import { selectCurrentUser } from '../../users/users.selectors';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LikeButtonProps {
    id: UUID;
    treeBranchId?: UUID;
    branchId?: UUID;
    likesCount?: number | null;
    fontSize?: number;
}

export default function LikeButton(props: LikeButtonProps) {
    const {
        id, branchId = id, fontSize, likesCount, treeBranchId,
    } = props;
    const likes = useSelector(selectBranchLikes(branchId));
    const likedByCurrentUser = !!likes[id];
    const [shouldBeat, setShouldBeat] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (id && likesCount === undefined) {
            dispatch(getLikesCount({
                objectId: id,
                branchId,
                treeBranchId,
            }));
        }
    }, [branchId, dispatch, id, likesCount, treeBranchId]);

    const handleLike = useCallback(() => {
        if (!currentUser) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'Log in to hit that like!',
            }));
            return;
        }

        if (likedByCurrentUser) {
            dispatch(unlikeObject({
                treeBranchId,
                objectId: id,
                branchId,
            }));
        } else {
            dispatch(likeObject({
                treeBranchId,
                objectId: id,
                branchId,
                objectType: LikeType.Node,
            }));
        }

        requestAnimationFrame(() => setShouldBeat(true));
        setTimeout(() => setShouldBeat(false), 1000);
    }, [branchId, currentUser, dispatch, id, likedByCurrentUser, treeBranchId]);

    return (
        <div className={`Like ${likedByCurrentUser && 'liked'}`}>
            <Checkbox
                checked={likedByCurrentUser}
                onClick={handleLike}
                className="Heart"
                disableRipple
                style={{ fontSize }}
                icon={(<FontAwesomeIcon icon={faHeartOutline} />)}
                checkedIcon={<FontAwesomeIcon icon={faHeart} beat={shouldBeat} />}
                inputProps={{ 'aria-label': 'Like' }}
            />
            <Typography variant="caption">
                {abbreviateNumber(likesCount || 0)}
            </Typography>
        </div>
    );
}
