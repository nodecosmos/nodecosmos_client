import useNodeColors from '../../../hooks/tree/node/useNodeColors';
import useNodeContext from '../../../hooks/tree/node/useNodeContext';
import {
    MAX_NODE_INPUT_SIZE, MIN_NODE_INPUT_SIZE, NODE_BUTTON_HEIGHT,
} from '../../../nodes.constants';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, {
    MouseEvent, useCallback, useEffect,
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

    const onEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlur();
        }
    }, [onBlur]);

    //------------------------------------------------------------------------------------------------------------------
    return (
        <div
            className={`NodeButton ${isSelected && 'selected'}`}
            style={{
                border: '1px solid',
                borderColor: outlineColor,
                backgroundColor,
                height: NODE_BUTTON_HEIGHT,
                color,
            }}
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
                style={{
                    color,
                    marginRight: titleLength < 4 ? 0 : -4,
                }}
            />
        </div>
    );
}

NodeInput.propTypes = {
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
