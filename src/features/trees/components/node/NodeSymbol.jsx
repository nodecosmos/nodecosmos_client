import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { Checkbox } from '@mui/material';
import useTreeContext from '../../hooks/useTreeContext';
import { TREES_TYPES } from '../../trees.constants';
import useNodeContext from '../../hooks/node/useNodeContext';
import useTreeCommands from '../../hooks/useTreeCommands';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedCheckbox = memo(Checkbox);

export default function NodeSymbol() {
  const { nodeId, outlineColor } = useNodeContext();
  const { type: treeType } = useTreeContext();
  const { handleCheckboxChange, isChecked } = useTreeCommands();

  if (treeType !== TREES_TYPES.checkbox) {
    return (
      <MemoizedTagRounded style={{ color: 'inherit' }} />
    );
  }

  return (
    <MemoizedCheckbox
      label={nodeId}
      style={{ color: outlineColor }}
      value={nodeId}
      checked={isChecked(nodeId)}
      onChange={handleCheckboxChange}
    />
  );
}
