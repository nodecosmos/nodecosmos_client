import NodeSymbol from './NodeSymbol';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import useStopPropagation from '../../../../../common/hooks/useStopPropagation';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useNodeActions from '../../../hooks/node/useNodeActions';
import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { maybeSelectNode } from '../../../nodes.selectors';
import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

function NodeButton() {
    const theme: NodecosmosTheme = useTheme();
    const {
        id,
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
    } = useNodeActions();
    const { originalId } = useBranchContext();
    const originalNode = useSelector(maybeSelectNode(originalId, id));
    const isTitleEdited = originalNode ? title !== originalNode.title : false;
    const preventDefault = usePreventDefault();
    const stopPropagation = useStopPropagation();
    const { size } = useTreeContext();
    const { height, fontSize } = size;
    const buttonStyle = useMemo(() => ({
        height,
        border: '1px solid',
        borderColor: outlineColor,
        backgroundColor: isDragOver ? theme.palette.tree.dragInIndicator : backgroundColor,
        color: isDragOver ? theme.palette.text.primary : color,
    }),
    [
        backgroundColor,
        color,
        height,
        isDragOver,
        outlineColor,
        theme.palette.text.primary,
        theme.palette.tree.dragInIndicator,
    ]);
    const divStyle = useMemo(() => ({ fontSize }), [fontSize]);

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
            style={buttonStyle}
        >
            <NodeSymbol />

            <div
                className="NodeButtonText"
                style={divStyle}>
                {isTitleEdited && <span className="diff-removed">{originalNode?.title}</span>}
                <span className={isTitleEdited ? 'diff-added' : undefined}>{title}</span>
            </div>
        </button>
    );
}

// parent component NodeContent can change on position change, but this one remains the same,
// so we should get better performance by memoizing it
export default React.memo(NodeButton);
