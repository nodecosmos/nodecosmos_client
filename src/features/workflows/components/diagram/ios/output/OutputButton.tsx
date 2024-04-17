import EditTitleField from '../../../../../../common/components/EditTItleField';
import usePreventDefault from '../../../../../../common/hooks/usePreventDefault';
import { TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import {
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT,
    OUTPUT_BUTTON_SKEWED_WIDTH,
    OUTPUT_BUTTON_X_MARGIN,
} from '../../../../constants';
import useIoActions from '../../../../hooks/diagram/io/useIoActions';
import useIoContext from '../../../../hooks/diagram/io/useIoContext';
import useOutputColors from '../../../../hooks/diagram/useOutputColors';
import useWorkflowContext from '../../../../hooks/useWorkflowContext';
import { Box, Checkbox } from '@mui/material';
import React from 'react';

export default function OutputButton() {
    const {
        inputsAdditionActive,
        selectedInputs,
    } = useWorkflowContext();
    const {
        title, id, x, y, titleEditOpen,
    } = useIoContext();
    const isChecked = selectedInputs.has(id);
    const {
        backgroundColor,
        outlineColor,
        color,
        checkboxColor,
    } = useOutputColors();
    const {
        handleIoClick, handleTitleChange, closeTitleEdit,
    } = useIoActions();
    const preventDefault = usePreventDefault();

    return (
        <foreignObject
            width={OUTPUT_BUTTON_SKEWED_WIDTH}
            height={NODE_BUTTON_HEIGHT + 3}
            x={x + OUTPUT_BUTTON_X_MARGIN}
            y={y - MARGIN_TOP}
            style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
        >
            {
                !titleEditOpen && (
                    <button
                        type="button"
                        className="WorkflowOutputButton"
                        onClick={handleIoClick}
                        onKeyUp={preventDefault}
                        style={{
                            background: backgroundColor,
                            border: `1px solid ${isChecked ? checkboxColor : outlineColor}`,
                            color,
                        }}
                    >
                        {
                            inputsAdditionActive
                            && <Checkbox
                                style={{ color: checkboxColor }}
                                value={id}
                                checked={isChecked} />
                        }
                        <div className="IoButtonText">
                            {title as string}
                        </div>
                    </button>
                )
            }
            {
                titleEditOpen && (
                    <Box sx={{ backgroundColor: 'background.1' }}>
                        <EditTitleField
                            title={title}
                            color="text.primary"
                            variant="body2"
                            onChange={handleTitleChange}
                            onClose={closeTitleEdit}
                            defaultEditing
                        />
                    </Box>
                )

            }
        </foreignObject>
    );
}
