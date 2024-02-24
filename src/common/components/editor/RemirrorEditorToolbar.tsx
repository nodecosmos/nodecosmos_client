import BlockQuote from './toolbar/BlockQuote';
import Bold from './toolbar/Bold';
import BulletList from './toolbar/BulletList';
import Code from './toolbar/Code';
import { CodeBlock } from './toolbar/CodeBlock';
import File from './toolbar/File';
import Heading from './toolbar/Heading';
import Image from './toolbar/Image';
import Italic from './toolbar/Italic';
import OrderedList from './toolbar/OrderedList';
import Redo from './toolbar/Redo';
import Strikethrough from './toolbar/Strikethrough';
import Undo from './toolbar/Undo';
import { EnabledExtensions } from '../../hooks/remirror/useExtensions';
import { Stack } from '@mui/material';
import React, { useMemo, ReactNode } from 'react';

type ToolbarComponent = ReactNode;
type ToolbarMap = Record<EnabledExtensions, ToolbarComponent>;

const TOOLBAR_MAP: ToolbarMap = {
    [EnabledExtensions.Blockquote]: <BlockQuote />,
    [EnabledExtensions.Bold]: <Bold />,
    [EnabledExtensions.BulletList]: <BulletList />,
    [EnabledExtensions.Code]: <Code />,
    [EnabledExtensions.CodeBlock]: <CodeBlock />,
    [EnabledExtensions.File]: <File />,
    [EnabledExtensions.Heading]: <Heading />,
    [EnabledExtensions.Image]: <Image />,
    [EnabledExtensions.Italic]: <Italic />,
    [EnabledExtensions.OrderedList]: <OrderedList />,
    [EnabledExtensions.Strike]: <Strikethrough />,

    // non toolbar extensions
    [EnabledExtensions.HardBreak]: null,
    [EnabledExtensions.Link]: null,
    [EnabledExtensions.ListItem]: null,
    [EnabledExtensions.Markdown]: null,
    [EnabledExtensions.Placeholder]: null,
    [EnabledExtensions.TaskList]: null,
    [EnabledExtensions.TrailingNode]: null,
};

interface RemirrorEditorToolbarProps {
    enabledExtensions?: EnabledExtensions[];
}

export default function RemirrorEditorToolbar({ enabledExtensions }: RemirrorEditorToolbarProps) {
    const enabledExtMap: Partial<ToolbarMap> = useMemo(() => {
        if (enabledExtensions) {
            const toolbarMap: Partial<ToolbarMap> = {};

            enabledExtensions.forEach((extension) => {
                toolbarMap[extension] = TOOLBAR_MAP[extension];
            });
            return toolbarMap;
        } else {
            return TOOLBAR_MAP;
        }
    }, [enabledExtensions]);

    return (
        <div className="RemirrorToolbar">
            <Stack direction="row" spacing={1}>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Bold]}
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Italic]}
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Strike]}
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Code]}
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Heading]}
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.BulletList]}
                    {enabledExtMap?.[EnabledExtensions.OrderedList]}
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Blockquote]}
                    {enabledExtMap?.[EnabledExtensions.CodeBlock]}
                </div>
                <div>
                    <Undo />
                    <Redo />
                </div>
                <div>
                    {enabledExtMap?.[EnabledExtensions.Image]}
                    {enabledExtMap?.[EnabledExtensions.File]}
                </div>
            </Stack>
        </div>
    );
}
