import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import abbreviateNumber from '../../../utils/abbreviateNumber';
import { setAlert } from '../../app/appSlice';
import { selectBranchLikes } from '../../likes/likes.selectors';
import {
    getLikeCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { LikeType } from '../../likes/likes.types';
import { selectCurrentUser } from '../../users/users.selectors';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LikeButtonProps {
    id: UUID;
    objectType: LikeType;
    currentBranchId?: UUID;
    branchId?: UUID;
    likeCount?: number | null;
    fontSize?: number;
}

export default function LikeButton(props: LikeButtonProps) {
    const {
        id, objectType, branchId = id, fontSize, likeCount, currentBranchId,
    } = props;
    const likes = useSelector(selectBranchLikes(branchId));
    const likedByCurrentUser = !!likes[id];
    const [shouldBeat, setShouldBeat] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (id && likeCount === undefined) {
            dispatch(getLikeCount({
                objectId: id,
                branchId,
                currentBranchId,
                objectType,
            }));
        }
    }, [branchId, dispatch, id, likeCount, currentBranchId, objectType]);

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
                currentBranchId,
                objectId: id,
                branchId,
            }));
        } else {
            dispatch(likeObject({
                currentBranchId,
                objectId: id,
                branchId,
                objectType: LikeType.Node,
            }));
        }

        requestAnimationFrame(() => setShouldBeat(true));
        setTimeout(() => setShouldBeat(false), 1000);
    }, [branchId, currentUser, dispatch, id, likedByCurrentUser, currentBranchId]);

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
                {abbreviateNumber(likeCount || 0)}
            </Typography>
        </div>
    );
}
