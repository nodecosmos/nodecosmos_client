import NodeSymbol from './NodeSymbol';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import useStopPropagation from '../../../../../common/hooks/useStopPropagation';
import { NodecosmosTheme } from '../../../../../themes/type';
import useNodeColors from '../../../hooks/tree/node/useNodeColors';
import useNodeCommands from '../../../hooks/tree/node/useNodeCommands';
import useNodeContext from '../../../hooks/tree/node/useNodeContext';
import { useTheme } from '@mui/material';
import React from 'react';

function NodeButton() {
    const theme: NodecosmosTheme = useTheme();
    const {
        title,
        isDragOver,
    } = useNodeContext();
    const {
        backgroundColor,
        outlineColor,
        color,
        isSelected,
        outlinedColored,
    } = useNodeColors();
    const {
        clickNode,
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    } = useNodeCommands();

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
            onDropCapture={dropCapture}
            type="button"
            className={`NodeButton ${isSelected && 'selected'} ${(outlinedColored || isDragOver) && 'outlined'}`}
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

// parent component NodeContent can change on position change, but this one remains the same,
// so we should get better performance by memoizing it
export default React.memo(NodeButton);
