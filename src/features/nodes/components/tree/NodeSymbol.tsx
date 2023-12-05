import useNodeColors from '../../hooks/tree/useNodeColors';
import useNodeContext from '../../hooks/tree/useNodeContext';
import useTreeCommands from '../../hooks/tree/useTreeCommands';
import useTreeContext from '../../hooks/useTreeContext';
import { TreeType } from '../../nodes.types';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from '@mui/material';
import React from 'react';

export default function NodeSymbol() {
    const { id } = useNodeContext();
    const { outlineColor } = useNodeColors();
    const { type: treeType } = useTreeContext();
    const { handleCheckboxChange, isChecked } = useTreeCommands();

    if (treeType !== TreeType.Checkbox) {
        return (
            <FontAwesomeIcon icon={faHashtag} />
        );
    }

    return (
        <Checkbox
            style={{ color: outlineColor }}
            value={id}
            checked={isChecked(id)}
            onChange={handleCheckboxChange}
        />
    );
}
