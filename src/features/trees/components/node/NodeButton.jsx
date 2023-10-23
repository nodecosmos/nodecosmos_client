import React from 'react';
import { useTheme } from '@mui/material';
/* nodecosmos */
import useNodeContext, { useNodeColors } from '../../hooks/node/useNodeContext';
import useNodeCommands from '../../hooks/node/useNodeCommands';
import NodeSymbol from './NodeSymbol';

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

    return (
        <button
            draggable
            onMouseDown={(event) => event.stopPropagation()} // prevents pannable from firing
            onDragStart={startDrag}
            onDragEnd={stopDrag}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDropCapture={captureDroppedNode}
            type="button"
            className={`NodeButton ${hasBg && 'selected'} ${(outlinedColored || isDragOver) && 'outlined'}`}
            onClick={clickNode}
            onKeyUp={(event) => event.preventDefault()}
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
