import useEditorItem from '../../../hooks/editor/useEditorItem';
import { faSquareQuote } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function BlockQuote() {
    const [isActive, toggleNode] = useEditorItem('blockquote');

    return (
        <Tooltip title="Insert blockquote">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faSquareQuote} />
            </ToggleButton>
        </Tooltip>
    );
}
