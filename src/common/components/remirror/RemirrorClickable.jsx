/* eslint-disable  */
import { useCommands } from '@remirror/react';
import PropTypes from 'prop-types';

export default function RemirrorClickable({ children }) {
  const commands = useCommands();

  return (
    <div
      className="RemirrorTextEditor"
      onClick={() => commands.focus()}
    >
      {children}
    </div>
  );
}

RemirrorClickable.popTypes = {
  children: PropTypes.node.isRequired,
};
