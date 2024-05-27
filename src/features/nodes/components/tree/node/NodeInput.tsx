import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { MAX_NODE_INPUT_SIZE, MIN_NODE_INPUT_SIZE } from '../../../nodes.constants';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
    MouseEvent, useCallback, useEffect, useMemo,
} from 'react';

interface NodeInputProps {
    onClick: (event: MouseEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

export default function NodeInput(props: NodeInputProps) {
    const {
        onClick, onChange, onBlur,
    } = props;

    const ref = React.useRef<HTMLInputElement | null>(null);
    const { title } = useNodeContext();
    const {
        isSelected,
        backgroundColor,
        outlineColor,
        color,
    } = useNodeColors();

    useEffect(() => ref.current?.focus(), []);

    const titleLength = title ? title.length : 0;
    const { height, fontSize } = useTreeContext().size;

    const onEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlur();

            event.stopPropagation();
            event.preventDefault();
        }
    }, [onBlur]);

    const divStyle = useMemo(() => ({
        height,
        border: '1px solid',
        borderColor: outlineColor,
        backgroundColor,
        color,
        fontSize,
    }), [backgroundColor, color, fontSize, height, outlineColor]);

    const inputStyle = useMemo(() => ({
        color,
        marginRight: titleLength < 4 ? 0 : -4,
    }), [color, titleLength]);

    //------------------------------------------------------------------------------------------------------------------
    return (
        <div
            className={`NodeButton ${isSelected && 'selected'}`}
            style={divStyle}
        >
            <FontAwesomeIcon icon={faHashtag} />
            <input
                className="NodeButtonText Input"
                ref={ref}
                onClick={onClick}
                onChange={onChange}
                onKeyDown={onEnter}
                onBlur={onBlur}
                value={title}
                maxLength={MAX_NODE_INPUT_SIZE}
                size={Math.max(titleLength, MIN_NODE_INPUT_SIZE)}
                style={inputStyle}
            />
        </div>
    );
}
