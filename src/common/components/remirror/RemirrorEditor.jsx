import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
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
  HardBreakExtension,
  TaskListExtension,
  YjsExtension,
} from 'remirror/extensions';
import { useSelector } from 'react-redux';
import { WS_URI } from '../../../apis/nodecosmos-server';
import { selectCurrentUser } from '../../../features/authentication/authentication.selectors';
import { base64ToUint8Array } from '../../serializer';
import RemirrorEditorWrapper from './RemirrorEditorWrapper';

let ydoc = new Y.Doc();

export default function RemirrorEditor({
  markdown, onChange, wsEndpoint, wsRoomName, base64,
}) {
  const currentUser = useSelector(selectCurrentUser);

  const doc = useMemo(() => {
    const uint8Array = base64ToUint8Array(base64);
    if (base64) {
      Y.applyUpdateV2(ydoc, uint8Array);
    }
    return ydoc;
  }, [base64]);

  const extensions = useMemo(() => [
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
    new MarkdownExtension({ copyAsMarkdown: true }),
    new CodeExtension(),
    new CodeBlockExtension(),
    new ImageExtension(),
    new HardBreakExtension(),
    new TaskListExtension(),
  ], []);

  const [finalExtensions, setFinalExtensions] = React.useState(null);
  const provider = useMemo(
    () => {
      const wsProvider = new WebsocketProvider(`${WS_URI}${wsEndpoint}`, wsRoomName, doc);
      wsProvider.awareness.setLocalStateField('user', {
        name: currentUser.username,
      });

      return wsProvider;
    },
    [currentUser?.username, doc, wsEndpoint, wsRoomName],
  );

  useEffect(() => {
    const yjsExtension = new YjsExtension({
      getProvider: () => provider,
    });

    provider.on('status', (event) => {
      if (event.status === 'connected') {
        setFinalExtensions([...extensions, yjsExtension]);
      }
    });

    return () => {
      provider.disconnect();
      ydoc = new Y.Doc(); // reset ydoc
    };
  }, [extensions, provider]);

  if (!finalExtensions) return null;

  const handleChange = (obj) => {
    if (obj.tr && obj.tr.docChanged && !!obj.helpers.getText()) {
      const encoded = Y.encodeStateAsUpdateV2(doc);

      onChange(obj.helpers, encoded);
    }
  };

  return (
    <RemirrorEditorWrapper
      extensions={finalExtensions}
      markdown={markdown}
      onChange={handleChange}
      setInitialContent={!base64}
    />
  );
}

RemirrorEditor.defaultProps = {
  onChange: null,
  wsEndpoint: null,
  wsRoomName: null,
  base64: null,
};

RemirrorEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  base64: PropTypes.instanceOf(Uint8Array),
  onChange: PropTypes.func,
  wsEndpoint: PropTypes.string,
  wsRoomName: PropTypes.string,
};
