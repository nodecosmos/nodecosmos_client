import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeActions from '../../../hooks/tree/useTreeActions';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { TreeType } from '../../../nodes.types';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from '@mui/material';
import React, { useMemo } from 'react';

export default function NodeSymbol() {
    const { id } = useNodeContext();
    const { outlineColor } = useNodeColors();
    const { type: treeType } = useTreeContext();
    const { handleCheckboxChange, isChecked } = useTreeActions();
    const style = useMemo(() => ({ color: outlineColor }), [outlineColor]);

    if (treeType !== TreeType.Checkbox) {
        return (
            <FontAwesomeIcon icon={faHashtag} />
        );
    }

    return (
        <Checkbox
            style={style}
            value={id}
            checked={isChecked(id)}
            onChange={handleCheckboxChange}
        />
    );
}
