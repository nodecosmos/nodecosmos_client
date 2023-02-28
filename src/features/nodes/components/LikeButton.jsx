import React from 'react';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../authentication/authentication.selectors';
import { selectNode, selectNodeAttribute } from '../nodes.selectors';
import { likeNode, unlikeNode } from '../nodes.thunks';

export default function LikeButton(props) {
  const { nodeId } = props;
  const { id: currentUserId } = useSelector(selectCurrentUser);
  const {
    isTemp,
    persistentId,
  } = useSelector(selectNode(nodeId));

  const likedByUserIds = useSelector(selectNodeAttribute(persistentId, 'likedByUserIds'));
  const likesCount = useSelector(selectNodeAttribute(persistentId, 'likesCount'));

  const [isLiked, setIsLiked] = React.useState(!!likedByUserIds && likedByUserIds.includes(currentUserId));
  const [shouldBeat, setShouldBeat] = React.useState(false);

  const dispatch = useDispatch();

  const handleLike = () => {
    if (isTemp) return;

    if (isLiked) {
      dispatch(unlikeNode(persistentId));
    } else {
      dispatch(likeNode(persistentId));
    }

    setIsLiked(!isLiked);
    requestAnimationFrame(() => setShouldBeat(true));
    setTimeout(() => setShouldBeat(false), 1000);
  };

  const [textColor, setTextColor] = React.useState(isLiked ? 'toolbar.red' : 'text.tertiary');

  return (
    <Box
      onMouseOver={() => setTextColor('toolbar.red')}
      onMouseLeave={() => setTextColor(isLiked ? 'toolbar.red' : 'text.tertiary')}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Checkbox
        checked={isLiked}
        onClick={handleLike}
        className="Item"
        disableRipple
        sx={{ svg: { color: 'toolbar.red' }, '&:hover': { backgroundColor: 'transparent!important' } }}
        icon={(<FontAwesomeIcon icon={faHeartOutline} />)}
        checkedIcon={<FontAwesomeIcon icon={faHeart} beat={shouldBeat} />}
        inputProps={{ 'aria-label': 'Favorite' }}
      />
      {
        likesCount > 0 && (
          <Typography
            variant="caption"
            sx={{
              color: textColor,
              lineHeight: 1,
            }}
          >
            {likesCount}
          </Typography>
        )
      }
    </Box>
  );
}

LikeButton.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
