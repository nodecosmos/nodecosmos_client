import React, { useEffect } from 'react';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../../app/appSlice';
import { selectCurrentUser } from '../../../authentication/authentication.selectors';
import { selectLikedObjectIds } from '../../../likes/likes.selectors';
import { addLikedObjectId, removeLikedObjectId } from '../../../likes/likesSlice';
import { selectNode, selectNodeAttribute } from '../../nodes.selectors';
import {
  getLikesCount, likeNode, unlikeNode,
} from '../../nodes.thunks';
import abbreviateNumber from '../../../../common/abbreviateNumber';

export default function LikeButton({ nodeId, fontSize, likesCount: providedLikesCount }) {
  const {
    isTemp,
    persistentId,
  } = useSelector(selectNode(nodeId)) || {
    persistentId: nodeId,
  };
  const likes = useSelector(selectLikedObjectIds);
  const stateLikesCount = useSelector(selectNodeAttribute(persistentId, 'likesCount'));
  const likesCount = providedLikesCount !== null ? providedLikesCount : stateLikesCount;
  const likedByCurrentUser = likes.includes(persistentId);
  const [shouldBeat, setShouldBeat] = React.useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (persistentId && likesCount === undefined) {
      dispatch(getLikesCount(persistentId));
    }
  }, [dispatch, persistentId, likesCount]);

  const handleLike = () => {
    if (isTemp) return;

    if (!currentUser) {
      dispatch(setAlert({ isOpen: true, severity: 'warning', message: 'Log in to hit that like!' }));
      return;
    }

    if (likedByCurrentUser) {
      dispatch(removeLikedObjectId({ id: persistentId }));
      dispatch(unlikeNode(persistentId));
    } else {
      dispatch(addLikedObjectId({ id: persistentId }));
      dispatch(likeNode(persistentId));
    }

    requestAnimationFrame(() => setShouldBeat(true));
    setTimeout(() => setShouldBeat(false), 1000);
  };

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
