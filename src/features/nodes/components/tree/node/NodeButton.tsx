import NodeSymbol from './NodeSymbol';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import useStopPropagation from '../../../../../common/hooks/useStopPropagation';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useNodeDrag from '../../../hooks/node/actions/useNodeDrag';
import useNodeBranchContext from '../../../hooks/node/useNodeBranchContext';
import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { maybeSelectNode } from '../../../nodes.selectors';
import { useTheme } from '@mui/material';
import React, { MouseEvent, useMemo } from 'react';
import { useSelector } from 'react-redux';

function NodeButton({ onClick }: {onClick: (event: MouseEvent<HTMLButtonElement>) => void}) {
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
    const [
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    ] = useNodeDrag();
    const { originalId } = useBranchContext();
    const ctx = useNodeBranchContext();
    const originalNode = useSelector(maybeSelectNode(originalId, id));
    const preventDefault = usePreventDefault();
    const stopPropagation = useStopPropagation();
    const { size, showTreeColors } = useTreeContext();
    const { height, fontSize } = size;
    const buttonStyle = useMemo(() => ({
        border: '1px solid',
        borderColor: outlineColor,
        backgroundColor: isDragOver ? theme.palette.tree.dragInIndicator : backgroundColor,
        color: isDragOver ? theme.palette.text.primary : color,
    }),
    [
        backgroundColor,
        color,
        isDragOver,
        outlineColor,
        theme.palette.text.primary,
        theme.palette.tree.dragInIndicator,
    ]);
    const divStyle = useMemo(() => ({ fontSize }), [fontSize]);
    const className = useMemo(() => {
        let className = `NodeButton h-${height}`;
        if (isSelected) {
            className += ' selected';
        }

        if (showTreeColors && (outlinedColored || isDragOver)) {
            className += ' outlined';
        }

        return className;
    }, [height, isSelected, showTreeColors, outlinedColored, isDragOver]);

    const isTitleEdited = ctx?.isTitleEdited && originalNode && title !== originalNode?.title;

    return (
        <button
            className={className}
            draggable
            type="button"
            onMouseDown={stopPropagation} // prevents pannable from firing
            onDragStart={startDrag}
            onDragEnd={stopDrag}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDropCapture={dropCapture}
            onKeyUp={preventDefault}
            style={buttonStyle}
            onClick={onClick}
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
