import NodeSymbol from './NodeSymbol';
import usePreventDefault from '../../../../common/hooks/usePreventDefault';
import useStopPropagation from '../../../../common/hooks/useStopPropagation';
import useNodeCommands from '../../hooks/node/useNodeCommands';
import useNodeContext, { useNodeColors } from '../../hooks/node/useNodeContext';
import { useTheme } from '@mui/material';
import React from 'react';
/* nodecosmos */

export default function NodeButton() {
    const {
        title,
        isDragOver,
    } = useNodeContext();
    const {
        backgroundColor,
        outlineColor,
        color,
        hasBg,
        outlinedColored,
    } = useNodeColors();
    const {
        clickNode,
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        captureDroppedNode,
    } = useNodeCommands();

    const theme = useTheme();

    const preventDefault = usePreventDefault();
    const stopPropagation = useStopPropagation();

    return (
        <button
            draggable
            onMouseDown={stopPropagation} // prevents pannable from firing
            onDragStart={startDrag}
            onDragEnd={stopDrag}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDropCapture={captureDroppedNode}
            type="button"
            className={`NodeButton ${hasBg && 'selected'} ${(outlinedColored || isDragOver) && 'outlined'}`}
            onClick={clickNode}
            onKeyUp={preventDefault}
            style={{
                border: '1px solid',
                borderColor: outlineColor,
                backgroundColor: isDragOver ? theme.palette.tree.dragInIndicator : backgroundColor,
                color: isDragOver ? theme.palette.text.primary : color,
            }}
        >
            <NodeSymbol />

            <div className="NodeButtonText">
                {title}
            </div>
        </button>
    );
}
