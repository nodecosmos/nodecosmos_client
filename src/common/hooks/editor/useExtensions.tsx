import { WS_URI } from '../../../api/nodecosmos-server';
import { selectCurrentUser } from '../../../features/users/users.selectors';
import { UUID } from '../../../types';
import { base64ToUint8Array } from '../../../utils/serializer';
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
    StrikeExtension,
    TrailingNodeExtension,
    YjsExtension,
} from 'remirror/extensions';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

// sort alphabetically
export enum EnabledExtensions {
    Blockquote,
    Bold,
    BulletList,
    Code,
    CodeBlock,
    File,
    HardBreak,
    Heading,
    Image,
    Italic,
    Link,
    ListItem,
    Markdown,
    OrderedList,
    Placeholder,
    Strike,
    TrailingNode,
}

export type RemirrorExtensions = BlockquoteExtension
    | BoldExtension
    | BulletListExtension
    | CodeBlockExtension
    | CodeExtension
    | HardBreakExtension
    | HeadingExtension
    | ImageExtension
    | ItalicExtension
    | LinkExtension
    | ListItemExtension
    | MarkdownExtension
    | OrderedListExtension
    | PlaceholderExtension
    | StrikeExtension
    | TrailingNodeExtension
    | YjsExtension

const extensionMap: Record<EnabledExtensions, () => RemirrorExtensions> = {
    [EnabledExtensions.Link]: () => new LinkExtension({
        defaultTarget: '_blank',
        autoLink: false,
    }),
    [EnabledExtensions.Placeholder]: () => new PlaceholderExtension({ placeholder: 'Enter your description here...' }),
    [EnabledExtensions.Bold]: () => new BoldExtension({}),
    [EnabledExtensions.Strike]: () => new StrikeExtension(),
    [EnabledExtensions.Italic]: () => new ItalicExtension(),
    [EnabledExtensions.Heading]: () => new HeadingExtension({}),
    [EnabledExtensions.Blockquote]: () => new BlockquoteExtension(),
    [EnabledExtensions.BulletList]: () => new BulletListExtension({ enableSpine: true }),
    [EnabledExtensions.OrderedList]: () => new OrderedListExtension(),
    [EnabledExtensions.ListItem]: () => new ListItemExtension({
        priority: ExtensionPriority.High,
        enableCollapsible: true,
    }),
    [EnabledExtensions.TrailingNode]: () => new TrailingNodeExtension({}),
    [EnabledExtensions.Markdown]: () => new MarkdownExtension({}),
    [EnabledExtensions.Code]: () => new CodeExtension({}),
    [EnabledExtensions.CodeBlock]: () => new CodeBlockExtension({}),
    [EnabledExtensions.Image]: () => new ImageExtension({}),
    [EnabledExtensions.HardBreak]: () => new HardBreakExtension(),
    [EnabledExtensions.File]: () => new LinkExtension({
        defaultTarget: '_blank',
        autoLink: false,
    }),
};

interface UseExtensionsProps {
    isRealTime?: boolean;
    base64?: string | null;
    wsAuthNodeId?: UUID;
    wsAuthNodeBranchId?: UUID;
    wsAuthRootId?: UUID;
    wsRoomId?: UUID;
    enabledExtensions?: EnabledExtensions[];
}

export default function useExtensions(props: UseExtensionsProps) {
    const {
        isRealTime,
        base64,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        wsRoomId,
        enabledExtensions,
    } = props;

    const baseExtensions = useMemo(() => {
        if (enabledExtensions) {
            return enabledExtensions.map(extension => extensionMap[extension]());
        } else {
            // Return all extensions if none are specifically enabled
            return Object.values(extensionMap).map(extension => extension());
        }
    }, [enabledExtensions]);
    const [initExtensions, setExtensions] = React.useState<RemirrorExtensions[]>([]);
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) {
        throw new Error('User not found');
    }

    const doc = useMemo(() => {
        if (!isRealTime) return null;

        const ydoc = new Y.Doc();

        if (base64) {
            const uint8Array = base64ToUint8Array(base64);
            base64 && Y.applyUpdateV2(ydoc, uint8Array);
        }

        return ydoc;

        // base64 is built on initial render if provided in props, and it should not be a dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRealTime]);

    const provider = useMemo(
        () => {
            if (!isRealTime || !wsRoomId || !doc) return null;

            const wsProvider = new WebsocketProvider(
                `${WS_URI}/ws/descriptions/${wsAuthNodeBranchId}/${wsAuthNodeId}/${wsAuthRootId}`, wsRoomId, doc,
            );

            wsProvider.awareness.setLocalStateField('user', { name: currentUser.username });

            return wsProvider;
        },
        [currentUser.username, doc, isRealTime, wsAuthNodeBranchId, wsAuthNodeId, wsAuthRootId, wsRoomId],
    );

    useEffect(() => {
        if (isRealTime) {
            if (!provider) return undefined;

            const getProvider = () => provider;
            const yjsExtension = new YjsExtension({
                getProvider,
                disableUndo: true,
            });

            provider.on('status', (event: {status: string}) => {
                if (event.status === 'connected') {
                    setExtensions([...baseExtensions, yjsExtension]);
                }
            });

            return () => {
                provider.disconnect();
            };
        }
        setExtensions(baseExtensions);
        return undefined;
    }, [baseExtensions, isRealTime, provider]);

    return useMemo(() => ({
        extensions: initExtensions,
        doc,
    }), [initExtensions, doc]);
}
