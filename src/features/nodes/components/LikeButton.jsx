import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/pro-regular-svg-icons';
import { selectCurrentUser } from '../../authentication/authentication.selectors';
import { selectNodeAttribute } from '../nodes.selectors';
import { likeNode, unlikeNode } from '../nodes.thunks';

export default function LikeButton(props) {
  const { nodeId } = props;
  const { id: currentUserId } = useSelector(selectCurrentUser);

  const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));

  const likedByUserIds = useSelector(selectNodeAttribute(nodeId, 'likedByUserIds'));
  const likesCount = useSelector(selectNodeAttribute(nodeId, 'likesCount'));

  const [isLiked, setIsLiked] = React.useState(!!likedByUserIds && likedByUserIds.includes(currentUserId));

  const dispatch = useDispatch();

  const handleLike = () => {
    if (isTemp) return;

    if (isLiked) {
      dispatch(unlikeNode(nodeId));
    } else {
      dispatch(likeNode(nodeId));
    }
    setIsLiked(!isLiked);
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
        sx={{ svg: { color: 'toolbar.red' } }}
        icon={(<FontAwesomeIcon icon={faHeartOutline} />)}
        checkedIcon={<FontAwesomeIcon icon={faHeart} />}
        inputProps={{ 'aria-label': 'Favorite' }}
      />
      {
        likesCount > 0 && (
          <Typography variant="caption" sx={{ color: textColor, lineHeight: 1 }}>
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
