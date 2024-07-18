import EditTitleField from '../../../../../../common/components/EditTItleField';
import usePreventDefault from '../../../../../../common/hooks/usePreventDefault';
import useIoActions from '../../../../hooks/diagram/io/useIoActions';
import useIoContext from '../../../../hooks/diagram/io/useIoContext';
import useOutputColors from '../../../../hooks/diagram/useOutputColors';
import useWorkflowContext from '../../../../hooks/useWorkflowContext';
import {
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT,
    OUTPUT_BUTTON_SKEWED_WIDTH,
    OUTPUT_BUTTON_X_MARGIN,
    Y_TRANSITION_STYLE,
} from '../../../../workflows.constants';
import { Checkbox } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useMemo } from 'react';

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
        handleIoClick, handleTitleChange, closeTitleEdit, ioLoading,
    } = useIoActions();
    const preventDefault = usePreventDefault();
    const buttonStyle = useMemo(() => ({
        backgroundColor,
        border: `1px solid ${isChecked ? checkboxColor : outlineColor}`,
        justifyContent: inputsAdditionActive ? 'flex-start' : 'center',
        color,
    }), [backgroundColor, checkboxColor, color, isChecked, inputsAdditionActive, outlineColor]);

    return (
        <foreignObject
            width={OUTPUT_BUTTON_SKEWED_WIDTH}
            height={NODE_BUTTON_HEIGHT + 3}
            x={x + OUTPUT_BUTTON_X_MARGIN}
            y={y - MARGIN_TOP}
            style={Y_TRANSITION_STYLE}
        >
            {
                !titleEditOpen && (
                    <button
                        type="button"
                        className="WorkflowOutputButton"
                        onClick={handleIoClick}
                        onKeyUp={preventDefault}
                        style={buttonStyle}
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
                        <div className="loader">
                            {
                                ioLoading && <CircularProgress size={20} />
                            }
                        </div>
                    </button>
                )
            }
            {
                titleEditOpen && (
                    <div className="background-1">
                        <EditTitleField
                            title={title}
                            color="text.primary"
                            variant="body2"
                            onChange={handleTitleChange}
                            onClose={closeTitleEdit}
                            defaultEditing
                        />
                    </div>
                )

            }
        </foreignObject>
    );
}
