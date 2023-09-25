import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTreeCheckbox } from '../../hooks/useTreeContext';
import { TREES_TYPES } from '../../trees.constants';
import { selectTreeNodeAttribute } from '../../trees.selectors';
import useNodeButtonColors from '../../hooks/useNodeButtonColors';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedCheckbox = memo(Checkbox);

export default function NodeSymbol({ treeNodeId }) {
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));

  const { outlineColor } = useNodeButtonColors(treeNodeId);
  const { treeType, commands, handleCheckboxChange } = useTreeCheckbox();

  if (treeType !== TREES_TYPES.checkbox) {
    return (
      <MemoizedTagRounded style={{
        color: 'inherit',
      }}
      />
    );
  }

  return (
    <MemoizedCheckbox
      style={{ color: outlineColor }}
      checked={commands.isChecked(nodeId)}
      value={nodeId}
      onChange={handleCheckboxChange}
    />
  );
}

NodeSymbol.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
