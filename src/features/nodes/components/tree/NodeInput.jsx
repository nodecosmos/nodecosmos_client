import React, { useEffect } from 'react';
import { TagRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../../hooks/tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';
import { selectNodeAttributeById } from '../../nodes.selectors';
import { NODE_BUTTON_HEIGHT } from './constants';

export default function NodeButtonText(props) {
  const {
    id,
    nestedLevel,
    isRoot,
  } = props;
  const ref = React.useRef(null);

  const {
    backgroundColor,
    color,
  } = useNodeButtonBackground({
    id,
    nestedLevel,
    isRoot,
  });

  const [focused, setFocused] = React.useState(false);

  const title = useSelector(selectNodeAttributeById(id, 'title'));

  //--------------------------------------------------------------------------------------------------------------------
  const {
    handleNodeTitleChange,
    handleNodeBlur,
    saveNode,
  } = useNodeTreeEvents(id);

  useEffect(() => {
    ref.current.focus();
    setFocused(true);
  }, [focused, handleNodeBlur]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div
      className="NodeButton"
      style={{
        backgroundColor,
        height: NODE_BUTTON_HEIGHT,
        color,
      }}
    >
      <TagRounded fontSize="small" ml="-2px" />
      <input
        ref={ref}
        onChange={handleNodeTitleChange}
        onKeyDown={(event) => event.key === 'Enter' && handleNodeBlur()}
        onKeyUp={saveNode}
        onBlur={() => focused && handleNodeBlur()}
        value={title || ''}
        className="NodeButtonText"
        maxLength={50}
        size={Math.max((title && title.length) || 0, 3)}
        style={{ color, fontFamily: 'monospace' }}
      />
    </div>
  );
}

NodeButtonText.propTypes = {
  id: PropTypes.string.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  isRoot: PropTypes.bool.isRequired,
};
