import useEditorItem from '../../../hooks/editor/useEditorItem';
import { faListOl } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function OrderedList() {
    const [isActive, toggleNode] = useEditorItem('orderedList');

    return (
        <Tooltip title="Insert numbered list">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faListOl} />
            </ToggleButton>
        </Tooltip>
    );
}
