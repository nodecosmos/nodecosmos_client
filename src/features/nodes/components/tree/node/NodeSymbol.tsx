import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { TreeType } from '../../../nodes.types';
import {
    faHashtag, faSquareCheck, faSquare,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';

export default function NodeSymbol() {
    const { checked } = useNodeContext();
    const { outlineColor } = useNodeColors();
    const { type: treeType } = useTreeContext();
    const style = useMemo(() => ({ color: outlineColor }), [outlineColor]);

    if (treeType !== TreeType.Checkbox) {
        return (
            <FontAwesomeIcon icon={faHashtag} style={style} />
        );
    }

    if (checked) {
        return (
            <FontAwesomeIcon icon={faSquareCheck} style={style} />
        );
    }

    return (
        <FontAwesomeIcon icon={faSquare} style={style} />
    );
}
