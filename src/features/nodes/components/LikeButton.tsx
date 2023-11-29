import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import abbreviateNumber from '../../../utils/abbreviateNumber';
import { setAlert } from '../../app/appSlice';
import { selectCurrentUser } from '../../authentication/authentication.selectors';
import { selectLikedObjectIds } from '../../likes/likes.selectors';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { addLikedObjectId, removeLikedObjectId } from '../../likes/likesSlice';
import { selectNodeAttribute } from '../nodes.selectors';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Checkbox, Typography, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LikeButtonProps {
    id: UUID;
    fontSize?: number;
    likesCount?: number;
}

export default function LikeButton(props: LikeButtonProps) {
    const {
        id, fontSize, likesCount: providedLikesCount,
    } = props;
    const likes = useSelector(selectLikedObjectIds);
    const stateLikesCount = useSelector(selectNodeAttribute(id, id, 'likesCount'));
    const likesCount = providedLikesCount !== null ? providedLikesCount : stateLikesCount;
    const likedByCurrentUser = likes.includes(id);
    const [shouldBeat, setShouldBeat] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (id && likesCount === undefined) {
            dispatch(getLikesCount(id));
        }
    }, [dispatch, id, likesCount]);

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
            dispatch(removeLikedObjectId({ id }));
            dispatch(unlikeObject(id));
        } else {
            dispatch(addLikedObjectId({ id }));
            dispatch(likeObject(id));
        }

        requestAnimationFrame(() => setShouldBeat(true));
        setTimeout(() => setShouldBeat(false), 1000);
    }, [currentUser, dispatch, likedByCurrentUser, id]);

    const [likeHovered, hoverLike, leaveLike] = useBooleanStateValue();

    const textColor = likeHovered || likedByCurrentUser ? 'toolbar.red' : 'text.tertiary';

    return (
        <Box
            onMouseOver={hoverLike}
            onMouseLeave={leaveLike}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Checkbox
                checked={likedByCurrentUser}
                onClick={handleLike}
                className="Item"
                disableRipple
                sx={{
                    svg: {
                        fontSize,
                        color: 'toolbar.red',
                    },
                }}
                icon={(<FontAwesomeIcon icon={faHeartOutline} />)}
                checkedIcon={<FontAwesomeIcon icon={faHeart} beat={shouldBeat} />}
                inputProps={{ 'aria-label': 'Like' }}
            />
            <Typography
                variant="caption"
                sx={{
                    color: textColor,
                    lineHeight: 1,
                }}
            >
                {abbreviateNumber(likesCount)}
            </Typography>
        </Box>
    );
}

LikeButton.defaultProps = {
    fontSize: 14,
    likesCount: null,
};

LikeButton.propTypes = {
    id: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    likesCount: PropTypes.number,
};
