import React, { useEffect } from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { MAX_NODE_INPUT_SIZE, MIN_NODE_INPUT_SIZE, NODE_BUTTON_HEIGHT } from '../../trees.constants';
import useNodeContext, { useNodeColors } from '../../hooks/node/useNodeContext';

export default function NodeInput({ onClick, onChange, onBlur }) {
  const ref = React.useRef(null);
  const {
    title,
  } = useNodeContext();
  const {
    hasBg,
    backgroundColor,
    outlineColor,
    color,
  } = useNodeColors();

  useEffect(() => ref.current.focus(), []);

  const titleLength = title ? title.length : 0;

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div
      className={`NodeButton ${hasBg && 'selected'}`}
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
        className="NodeButtonText"
        ref={ref}
        onClick={onClick}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onBlur();
          }
        }}
        onBlur={onBlur}
        value={title || ''}
        maxLength={MAX_NODE_INPUT_SIZE}
        size={Math.max(titleLength, MIN_NODE_INPUT_SIZE)}
        style={{ color, fontFamily: 'monospace' }}
      />
    </div>
  );
}

NodeInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
