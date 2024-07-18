import useNodeContext from '../../../../hooks/node/useNodeContext';
import useTreeContext from '../../../../hooks/tree/useTreeContext';
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import React, { useCallback } from 'react';

export default function CheckboxToolbar() {
    const {
        id,
        isExpanded,
        lastChildId,
    } = useNodeContext();
    const { expandNode, collapseNode } = useTreeContext();

    const toggleNodeExpand = useCallback(() => {
        if (isExpanded) {
            collapseNode(id);
        } else {
            expandNode(id);
        }
    }, [collapseNode, expandNode, id, isExpanded]);

    if (!lastChildId) {
        return null;
    }

    return (
        <div className="NodeToolbar">
            <Tooltip title={isExpanded ? 'Collapse Node' : 'Expand Node'} placement="top">
                <button
                    className="Item toolbar-default"
                    onClick={toggleNodeExpand}
                    aria-label="Toggle Node Expand">
                    <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} />
                </button>
            </Tooltip>
        </div>
    );
}
