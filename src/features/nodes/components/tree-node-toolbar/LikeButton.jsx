import abbreviateNumber from '../../../../utils/abbreviateNumber';
import { setAlert } from '../../../app/appSlice';
import { selectCurrentUser } from '../../../authentication/authentication.selectors';
import { selectLikedObjectIds } from '../../../likes/likes.selectors';
import { addLikedObjectId, removeLikedObjectId } from '../../../likes/likesSlice';
import { selectNodeAttribute } from '../../nodes.selectors';
import {
    getLikesCount, likeNode, unlikeNode,
} from '../../nodes.thunks';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Checkbox, Typography, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LikeButton({
    nodeId, fontSize, likesCount: providedLikesCount,
}) {
    const likes = useSelector(selectLikedObjectIds);
    const stateLikesCount = useSelector(selectNodeAttribute(nodeId, 'likesCount'));
    const likesCount = providedLikesCount !== null ? providedLikesCount : stateLikesCount;
    const likedByCurrentUser = likes.includes(nodeId);
    const [shouldBeat, setShouldBeat] = React.useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (nodeId && likesCount === undefined) {
            dispatch(getLikesCount(nodeId));
        }
    }, [dispatch, nodeId, likesCount]);

    const handleLike = useCallback(() => {
        if (!currentUser) {
            dispatch(setAlert({ isOpen: true, severity: 'warning', message: 'Log in to hit that like!' }));
            return;
        }

        if (likedByCurrentUser) {
            dispatch(removeLikedObjectId({ id: nodeId }));
            dispatch(unlikeNode(nodeId));
        } else {
            dispatch(addLikedObjectId({ id: nodeId }));
            dispatch(likeNode(nodeId));
        }

        requestAnimationFrame(() => setShouldBeat(true));
        setTimeout(() => setShouldBeat(false), 1000);
    }, [currentUser, dispatch, likedByCurrentUser, nodeId]);

    const [textColor, setTextColor] = React.useState(likedByCurrentUser ? 'toolbar.red' : 'text.tertiary');

    return (
        <Box
            onMouseOver={() => setTextColor('toolbar.red')}
            onMouseLeave={() => setTextColor(likedByCurrentUser ? 'toolbar.red' : 'text.tertiary')}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Checkbox
                checked={!!likedByCurrentUser}
                onClick={handleLike}
                className="Item"
                disableRipple
                sx={{ svg: { fontSize, color: 'toolbar.red' } }}
                icon={(<FontAwesomeIcon icon={faHeartOutline} />)}
                checkedIcon={<FontAwesomeIcon icon={faHeart} beat={shouldBeat} />}
                inputProps={{ 'aria-label': 'Favorite' }}
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
    nodeId: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    likesCount: PropTypes.number,
};
