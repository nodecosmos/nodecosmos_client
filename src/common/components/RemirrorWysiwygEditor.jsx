import React from 'react';
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
} from 'remirror/extensions';
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

  return (
    <RemirrorEditorContainer>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus
        onChange={handleEditorChange}
      >
        <MarkdownToolbar />
        <EditorComponent />
      </Remirror>
    </RemirrorEditorContainer>
  );
}

RemirrorWysiwygEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
