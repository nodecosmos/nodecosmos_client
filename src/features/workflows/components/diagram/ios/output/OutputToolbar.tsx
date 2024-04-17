import ToolsContainer from '../../../../../../common/components/tools/ToolsContainer';
import { TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import {
    NODE_BUTTON_HEIGHT, OUTPUT_BUTTON_SKEWED_WIDTH, OUTPUT_BUTTON_X_MARGIN,
} from '../../../../constants';
import useIoActions from '../../../../hooks/diagram/io/useIoActions';
import useIoContext from '../../../../hooks/diagram/io/useIoContext';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

export default function OutputToolbar() {
    const {
        isSelected, x, y,
    } = useIoContext();
    const { openTitleEdit, deleteIoCb } = useIoActions();

    if (!isSelected) {
        return null;
    }

    return (
        <foreignObject
            width={OUTPUT_BUTTON_SKEWED_WIDTH}
            height={NODE_BUTTON_HEIGHT}
            x={x + OUTPUT_BUTTON_X_MARGIN}
            y={y - 50}
            style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
        >
            <ToolsContainer justifyContent="end" ml={0}>
                <Tooltip title="Edit IO Title" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Edit IO Title"
                        sx={{
                            color: 'toolbar.green',
                            fontSize: 14,
                        }}
                        onClick={openTitleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete IO" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Delete IO"
                        sx={{
                            color: 'toolbar.lightRed',
                            fontSize: 14,
                            ml: 1,
                        }}
                        onClick={deleteIoCb}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                </Tooltip>
            </ToolsContainer>
        </foreignObject>
    );
}
