import MarkdownContainer from './MarkdownContainer';
import DescriptionComments from '../../../features/comments/components/DescriptionComments';
import useCodeMirrorTheme from '../../hooks/codemirror/useCodeMirrorTheme';
import diff from '../../lib/codemirror/extensions/diff';
import { onClick, onHover } from '../../lib/codemirror/extensions/events';
import { commentGutter } from '../../lib/codemirror/extensions/gutter';
import hover from '../../lib/codemirror/extensions/hover';
import {
    commentWidgetsField, commentThreadWidgetField, hoveredLineField, selectedLineField,
} from '../../lib/codemirror/stateFields';
import { markdown } from '@codemirror/lang-markdown';
import { Typography } from '@mui/material';
import { Extension, useCodeMirror } from '@uiw/react-codemirror';
import React, {
    useEffect, useMemo, useRef,
} from 'react';

interface CodeMirrorEditorProps {
    diffViewEnabled?: boolean;
    commentsEnabled?: boolean;
    originalValue?: string;
    value: string;
    onChange?: (value: string) => void;
    editable?: boolean;
}

export default function MarkdownEditor({
    diffViewEnabled = false,
    commentsEnabled = false,
    originalValue = '',
    value = '',
    onChange,
    editable,
}: CodeMirrorEditorProps) {
    const codeMirrorRef = useRef<HTMLDivElement>(null);
    const codeMirrorTheme = useCodeMirrorTheme();

    const extensions = useMemo(() => {
        const extensions: Extension[] = [markdown()];

        if (diffViewEnabled) {
            extensions.push(
                diff(originalValue, value),
            );
        }

        if (commentsEnabled) {
            extensions.push(
                // fields
                hoveredLineField,
                selectedLineField,
                commentWidgetsField,
                commentThreadWidgetField,
                // events
                onClick,
                onHover,
                // extensions
                commentGutter,
                hover,
            );
        }
        return extensions;
    }, [originalValue, commentsEnabled, diffViewEnabled, value]);

    const { setContainer, view } = useCodeMirror({
        container: codeMirrorRef.current,
        extensions,
        value,
        editable,
        onChange,
        theme: codeMirrorTheme,
    });

    useEffect(() => {
        if (codeMirrorRef.current) {
            setContainer(codeMirrorRef.current);
        }
    }, [setContainer]);

    return (
        <div>
            <Typography
                color="text.tertiary"
                variant="subtitle2"
                backgroundColor="background.1"
                p={1}
                borderBottom={1}
                borderColor="borders.3"
            >
                Currently markdown editor is in read-only mode and it is used to display differences between
                the original and the new description within the contribution request.
            </Typography>
            <MarkdownContainer>
                <div ref={codeMirrorRef} />
            </MarkdownContainer>
            {
                commentsEnabled && view && <DescriptionComments view={view} />
            }
        </div>

    );
}
