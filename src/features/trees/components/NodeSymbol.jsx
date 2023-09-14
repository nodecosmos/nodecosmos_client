import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTreeHelpers } from '../hooks/useTreeContext';
import { TREES_TYPES } from '../trees.constants';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectTreeNodeAttribute } from '../trees.selectors';
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);

export default function NodeSymbol({ treeNodeId }) {
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));

  const { nestedTreeColor } = useNodeButtonBackground(treeNodeId);

  const { treeType, commands } = useTreeHelpers();

  if (treeType === TREES_TYPES.default) {
    return (
      <MemoizedTagRounded style={{
        color: 'inherit',
      }}
      />
    );
  }

  return (
    <Checkbox
      sx={{
        color: nestedTreeColor,
        fontSize: '1.25rem',
      }}
      checked={commands.isSelected(persistentId)}
      value={persistentId}
      onChange={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target.checked) {
          commands.addId(persistentId);
        } else {
          commands.deleteId(persistentId);
        }
      }}
    />
  );
}

NodeSymbol.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
