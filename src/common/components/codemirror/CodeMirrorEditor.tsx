import CodeMirrorContainer from './CodeMirrorContainer';
import {
    commentGutter, hoveredLineField, mouseoverExtension,
} from '../../extensions/codemirror/comment';
import diff from '../../extensions/codemirror/diff';
import useCodeMirrorTheme from '../../hooks/codemirror/useCodeMirrorTheme';
import { markdown } from '@codemirror/lang-markdown';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import React, { useMemo, useRef } from 'react';

interface CodeMirrorEditorProps {
    showDiff?: boolean;
    currentValue?: string;
    value: string;
    onChange?: (value: string) => void;
    editable?: boolean;
}

export default function CodeMirrorEditor({
    showDiff = false,
    currentValue = '',
    value = '',
    onChange,
    editable,
}: CodeMirrorEditorProps) {
    const codeMirrorRef = useRef(null);
    const codeMirrorTheme = useCodeMirrorTheme();

    const extensions = useMemo(() => {
        const extensions: Extension[] = [markdown()];

        if (showDiff) {
            extensions.push(
                diff(currentValue, value),
                hoveredLineField,
                mouseoverExtension,
                mouseoverExtension,
                commentGutter,
            );
        }

        return extensions;
    }, [currentValue, showDiff, value]);

    return (
        <CodeMirrorContainer>
            <CodeMirror
                editable={editable}
                ref={codeMirrorRef}
                value={value}
                onChange={onChange}
                theme={codeMirrorTheme}
                extensions={[extensions]}
                height="100%"
            />
        </CodeMirrorContainer>
    );
}
