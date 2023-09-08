import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  EditorComponent,
  MarkdownToolbar,
  Remirror,
  useRemirror,
} from '@remirror/react';
import { ExtensionPriority } from 'remirror';
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TrailingNodeExtension,
  CodeExtension,
  CodeBlockExtension,
  ImageExtension,
} from 'remirror/extensions';
import { Box } from '@mui/material';
import RemirrorEditorContainer from './RemirrorEditorContainer';

export default function RemirrorWysiwygEditor({ markdown, onChange }) {
  const extensions = [
    new LinkExtension({ autoLink: true }),
    new PlaceholderExtension({ placeholder: 'Enter your description here...' }),
    new BoldExtension(),
    new StrikeExtension(),
    new ItalicExtension(),
    new HeadingExtension(),
    new BlockquoteExtension(),
    new BulletListExtension({ enableSpine: true }),
    new OrderedListExtension(),
    new ListItemExtension({
      priority: ExtensionPriority.High,
      enableCollapsible: true,
    }),
    new TrailingNodeExtension(),
    new MarkdownExtension({ copyAsMarkdown: false }),
    new CodeExtension(),
    new CodeBlockExtension(),
    new ImageExtension(),
  ];

  const {
    manager, state,
  } = useRemirror({
    extensions,
    content: markdown,
    stringHandler: 'markdown',
  });

  const handleEditorChange = (obj) => {
    if (obj.tr && obj.tr.docChanged) {
      onChange(obj.helpers);
    }
  };

  // eslint-disable-next-line max-len
  const src = 'https://nodecosmos-development.s3.amazonaws.com/ba7822a7-fb5f-4f95-849a-07f7c36697b0/1694196585-cover.jpeg';

  return (
    <RemirrorEditorContainer>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus
        onChange={handleEditorChange}
      >
        <Box className="RemirrorToolbar">
          <MarkdownToolbar />
          <button
            type="button"
            onClick={() => manager.store.commands.insertImage({ src })}
          >
            Insert Image
          </button>
        </Box>
        <EditorComponent />
      </Remirror>
    </RemirrorEditorContainer>
  );
}

RemirrorWysiwygEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
