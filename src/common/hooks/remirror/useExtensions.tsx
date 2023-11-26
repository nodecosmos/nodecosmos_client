import { WS_URI } from '../../../apis/nodecosmos-server';
import { selectCurrentUser } from '../../../features/authentication/authentication.selectors';
import { base64ToUint8Array } from '../../../utils/serializer';
import { Extension } from '@remirror/core';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ExtensionPriority } from 'remirror';
import {
    BlockquoteExtension,
    BoldExtension,
    BulletListExtension,
    CodeBlockExtension,
    CodeExtension,
    HardBreakExtension,
    HeadingExtension,
    ImageExtension,
    ItalicExtension,
    LinkExtension,
    ListItemExtension,
    MarkdownExtension,
    OrderedListExtension,
    PlaceholderExtension,
    StrikeExtension, TaskListExtension,
    TrailingNodeExtension, YjsExtension,
} from 'remirror/extensions';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

interface UseExtensionsProps {
    isRealTime?: boolean;
    base64?: string | null;
    wsAuthNodeId?: string;
    wsRoomId?: string;
}

export default function useExtensions(props: UseExtensionsProps) {
    const {
        isRealTime,
        base64,
        wsAuthNodeId,
        wsRoomId,
    } = props;

    const baseExtensions = useMemo(() => [
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
    const [extensions, setExtensions] = React.useState<Extension[]>([]);
    const currentUser = useSelector(selectCurrentUser);

    const doc = useMemo(() => {
        if (!isRealTime) return null;
        const ydoc = new Y.Doc();

        if (base64) {
            const uint8Array = base64ToUint8Array(base64);
            base64 && Y.applyUpdateV2(ydoc, uint8Array);
        }
        return ydoc;
    }, [base64, isRealTime]);

    const provider = useMemo(
        () => {
            if (!isRealTime || !wsRoomId || !doc) return null;

            const wsProvider = new WebsocketProvider(`${WS_URI}ws/description/${wsAuthNodeId}`, wsRoomId, doc);

            wsProvider.awareness.setLocalStateField('user', {
                name: currentUser.username,
            });

            return wsProvider;
        },
        [currentUser.username, doc, isRealTime, wsAuthNodeId, wsRoomId],
    );

    useEffect(() => {
        if (isRealTime) {
            if (!provider) return undefined;

            const getProvider = () => provider;
            const yjsExtension = new YjsExtension({ getProvider });

            provider.on('status', (event: {status: string}) => {
                if (event.status === 'connected') {
                    const extensions = [...baseExtensions, yjsExtension];
                    setExtensions(extensions as Extension[]);
                }
            });

            return () => {
                provider.disconnect();
            };
        }
        setExtensions(baseExtensions);
        return undefined;
    }, [baseExtensions, isRealTime, provider]);

    return { extensions, doc };
}
