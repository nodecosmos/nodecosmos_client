import React from 'react';
import PropTypes from 'prop-types';
import * as Y from 'yjs';
import useExtensions from '../../hooks/remirror/useExtensions';
import RemirrorEditorWrapper from './RemirrorEditorWrapper';

export default function RemirrorEditor({
  markdown, onChange, wsRoomId, base64, wsAuthNodeId, isRealTime,
}) {
  const { extensions, doc } = useExtensions({
    isRealTime,
    base64,
    wsAuthNodeId,
    wsRoomId,
  });

  if (!extensions) return null;

  const handleChange = (obj) => {
    if (obj.tr && obj.tr.docChanged && !!obj.helpers.getText()) {
      const encoded = (isRealTime && Y.encodeStateAsUpdateV2(doc)) || null;

      onChange(obj.helpers, encoded);
    }
  };

  return (
    <RemirrorEditorWrapper
      extensions={extensions}
      markdown={markdown}
      onChange={handleChange}
      setInitialContent={!base64}
    />
  );
}

RemirrorEditor.defaultProps = {
  onChange: null,
  wsRoomId: null,
  wsAuthNodeId: null,
  base64: null,
  isRealTime: false,
};

RemirrorEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  base64: PropTypes.string,
  onChange: PropTypes.func,
  wsAuthNodeId: PropTypes.string,
  wsRoomId: PropTypes.string,
  isRealTime: PropTypes.bool,
};
