/* eslint-disable */
import React from 'react';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import PropTypes from 'prop-types';
import DescriptionContainer from '../DescriptionContainer';
import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';
import RemirrorClickable from './RemirrorClickable';

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
        <RemirrorClickable>
          <DescriptionContainer width={1} maxWidth={"100%"}>
            <EditorComponent />
          </DescriptionContainer>
        </RemirrorClickable>
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
