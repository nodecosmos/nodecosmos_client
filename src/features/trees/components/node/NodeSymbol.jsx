import useNodeContext from '../../hooks/node/useNodeContext';
import useTreeCommands from '../../hooks/useTreeCommands';
import useTreeContext from '../../hooks/useTreeContext';
import { TREES_TYPES } from '../../trees.constants';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from '@mui/material';
import React from 'react';

export default function NodeSymbol() {
    const { nodeId, outlineColor } = useNodeContext();
    const { type: treeType } = useTreeContext();
    const { handleCheckboxChange, isChecked } = useTreeCommands();

    if (treeType !== TREES_TYPES.checkbox) {
        return (
            <FontAwesomeIcon icon={faHashtag} />
        );
    }

    return (
        <Checkbox
            label={nodeId}
            style={{ color: outlineColor }}
            value={nodeId}
            checked={isChecked(nodeId)}
            onChange={handleCheckboxChange}
        />
    );
}
