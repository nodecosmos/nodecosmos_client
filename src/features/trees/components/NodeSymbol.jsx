import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTreeCheckbox } from '../hooks/useTreeContext';
import { TREES_TYPES } from '../trees.constants';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectTreeNodeAttribute } from '../trees.selectors';
import useNodeButtonColors from '../hooks/useNodeButtonColors';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);

export default function NodeSymbol({ treeNodeId }) {
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const { outlineColor } = useNodeButtonColors(treeNodeId);
  const { treeType, commands } = useTreeCheckbox();

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
        p: 0,
        svg: {
          color: outlineColor,
          fontSize: '1.4rem',
        },
      }}
      checked={commands.isChecked(persistentId)}
      value={persistentId}
      onChange={(event) => {
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
