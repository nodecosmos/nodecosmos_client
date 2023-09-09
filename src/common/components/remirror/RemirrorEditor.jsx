import React from 'react';
import PropTypes from 'prop-types';

import {
  EditorComponent,
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
import DescriptionContainer from '../DescriptionContainer';
import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';

export default function RemirrorEditor({ markdown, onChange }) {
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

  return (
    <RemirrorEditorContainer>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus
        onChange={handleEditorChange}
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

RemirrorEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
