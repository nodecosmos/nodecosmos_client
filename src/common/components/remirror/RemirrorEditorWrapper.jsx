import React from 'react';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import PropTypes from 'prop-types';
import DescriptionContainer from '../DescriptionContainer';
import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';

export default function RemirrorEditorWrapper({
  extensions, setInitialContent, markdown, onChange,
}) {
  const options = {
    extensions,
    stringHandler: 'markdown',
  };

  if (setInitialContent) {
    options.content = markdown;
  }

  const { manager, state } = useRemirror(options);

  return (
    <RemirrorEditorContainer>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus
        onChange={onChange}
      >
        <RemirrorEditorToolbar />
        <div className="RemirrorTextEditor">
          <DescriptionContainer width={1}>
            <EditorComponent />
          </DescriptionContainer>
        </div>
      </Remirror>
    </RemirrorEditorContainer>
  );
}

RemirrorEditorWrapper.defaultProps = {
  onChange: null,
};

RemirrorEditorWrapper.propTypes = {
  extensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setInitialContent: PropTypes.bool.isRequired,
  markdown: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
