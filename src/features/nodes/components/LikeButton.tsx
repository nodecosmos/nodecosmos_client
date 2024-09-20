import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import abbreviateNumber from '../../../utils/abbreviateNumber';
import { setAlert } from '../../app/appSlice';
import { selectCurrentUserLikes } from '../../likes/likes.selectors';
import {
    getLikeCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { LikeType } from '../../likes/likes.types';
import { selectCurrentUser } from '../../users/users.selectors';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Typography } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LikeButtonProps {
    id: UUID;
    objectType: LikeType;
    branchId: UUID;
    rootId?: UUID;
    likeCount?: number | null;
    fontSize?: number;
}

export default function LikeButton(props: LikeButtonProps) {
    const {
        id, objectType, branchId, rootId, fontSize, likeCount,
    } = props;
    const likes = useSelector(selectCurrentUserLikes(branchId));
    const likedByCurrentUser = !!likes[id];
    const [shouldBeat, setShouldBeat] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (id && likeCount === undefined) {
            dispatch(getLikeCount({
                objectId: id,
                branchId,
            }));
        }
    }, [branchId, dispatch, id, likeCount, objectType]);

    const handleLike = useCallback(() => {
        if (!currentUser) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'You must be logged in order to like content.',
            }));
            return;
        }

        if (likedByCurrentUser) {
            dispatch(unlikeObject({
                branchId,
                objectId: id,
                userId: currentUser.id,
                rootId,
            }));
        } else {
            dispatch(likeObject({
                branchId,
                objectId: id,
                objectType: LikeType.Node,
                userId: currentUser.id,
                rootId,
            }));
        }

        requestAnimationFrame(() => setShouldBeat(true));
        setTimeout(() => setShouldBeat(false), 1000);
    }, [branchId, currentUser, dispatch, id, likedByCurrentUser, rootId]);

    const style = useMemo(() => ({ fontSize }), [fontSize]);
    const inputProps = useMemo(() => ({ 'aria-label': 'Like' }), []);

    return (
        <div className={`Like ${likedByCurrentUser && 'liked'}`}>
            <Checkbox
                checked={likedByCurrentUser}
                onClick={handleLike}
                className="Heart"
                disableRipple
                style={style}
                icon={(<FontAwesomeIcon icon={faHeartOutline} />)}
                checkedIcon={<FontAwesomeIcon icon={faHeart} beat={shouldBeat} />}
                inputProps={inputProps}
            />
            <Typography variant="caption">
                {abbreviateNumber(likeCount || 0)}
            </Typography>
        </div>
    );
}
