import BlockQuote from './toolbar/BlockQuote';
import Bold from './toolbar/Bold';
import BulletList from './toolbar/BulletList';
import Code from './toolbar/Code';
import { CodeBlock } from './toolbar/CodeBlock';
import File from './toolbar/File';
import Heading from './toolbar/Heading';
import Image from './toolbar/Image';
import Italic from './toolbar/Italic';
import Link from './toolbar/Link';
import OrderedList from './toolbar/OrderedList';
import Redo from './toolbar/Redo';
import Strikethrough from './toolbar/Strikethrough';
import Undo from './toolbar/Undo';
import { EditorExtensions } from './types';
import { useEditorContext } from '../../hooks/editor/useEditorContext';
import { Stack } from '@mui/material';
import React, { useMemo, ReactNode } from 'react';

type ToolbarComponent = ReactNode;
type ToolbarMap = Record<EditorExtensions, ToolbarComponent>;

const TOOLBAR_MAP: ToolbarMap = {
    [EditorExtensions.Blockquote]: <BlockQuote />,
    [EditorExtensions.Bold]: <Bold />,
    [EditorExtensions.BulletList]: <BulletList />,
    [EditorExtensions.Code]: <Code />,
    [EditorExtensions.CodeBlock]: <CodeBlock />,
    [EditorExtensions.File]: <File />,
    [EditorExtensions.Heading]: <Heading />,
    [EditorExtensions.Image]: <Image />,
    [EditorExtensions.Italic]: <Italic />,
    [EditorExtensions.OrderedList]: <OrderedList />,
    [EditorExtensions.Strike]: <Strikethrough />,
    [EditorExtensions.Link]: <Link />,

    // non toolbar extensions
    [EditorExtensions.HardBreak]: null,
    [EditorExtensions.ListItem]: null,
    [EditorExtensions.Markdown]: null,
    [EditorExtensions.Placeholder]: null,
    [EditorExtensions.TrailingNode]: null,
};

export default function EditorToolbar() {
    const { extensions } = useEditorContext();

    const enabledExtMap: Partial<ToolbarMap> = useMemo(() => {
        if (extensions) {
            const toolbarMap: Partial<ToolbarMap> = {};

            extensions.forEach((extension) => {
                toolbarMap[extension] = TOOLBAR_MAP[extension];
            });
            return toolbarMap;
        } else {
            return TOOLBAR_MAP;
        }
    }, [extensions]);

    return (
        <div className="EditorToolbar">
            <Stack direction="row" spacing={1}>
                <div>
                    <Undo />
                    <Redo />
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.Bold]}
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.Italic]}
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.Strike]}
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.Code]}
                </div>
                {
                    enabledExtMap?.[EditorExtensions.Heading]
                    && (
                        <div>
                            {enabledExtMap[EditorExtensions.Heading]}
                        </div>
                    )
                }
                <div>
                    {enabledExtMap?.[EditorExtensions.Link]}
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.BulletList]}
                    {enabledExtMap?.[EditorExtensions.OrderedList]}
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.Blockquote]}
                    {enabledExtMap?.[EditorExtensions.CodeBlock]}
                </div>
                <div>
                    {enabledExtMap?.[EditorExtensions.Image]}
                    {enabledExtMap?.[EditorExtensions.File]}
                </div>
            </Stack>
        </div>
    );
}
