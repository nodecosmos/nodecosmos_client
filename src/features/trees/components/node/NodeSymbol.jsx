import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { Checkbox } from '@mui/material';
import { useTreeCheckbox } from '../../hooks/useTreeContext';
import { TREES_TYPES } from '../../trees.constants';
import useNodeContext from '../../hooks/useNodeContext';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedCheckbox = memo(Checkbox);

function NodeSymbol() {
  const { nodeId, outlineColor } = useNodeContext();
  const { treeType, commands, handleCheckboxChange } = useTreeCheckbox();

  if (treeType !== TREES_TYPES.checkbox) {
    return (
      <MemoizedTagRounded style={{ color: 'inherit' }} />
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

export default memo(NodeSymbol);
