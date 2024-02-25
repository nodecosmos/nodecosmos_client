import CodeMirrorContainer from './CodeMirrorContainer';
import useCodeMirrorTheme from '../../hooks/codemirror/useCodeMirrorTheme';
import useComments from '../../hooks/codemirror/useComments';
import { commentGutter } from '../../lib/codemirror/extensions/comment';
import diff from '../../lib/codemirror/extensions/diff';
import mouseoverExtension from '../../lib/codemirror/extensions/mouseover';
import { commentWidgetsField, hoveredLineField } from '../../lib/codemirror/stateFields';
import { markdown } from '@codemirror/lang-markdown';
import { Extension, useCodeMirror } from '@uiw/react-codemirror';
import React, {
    useEffect, useMemo, useRef,
} from 'react';

interface CodeMirrorEditorProps {
    diffViewEnabled?: boolean;
    commentsEnabled?: boolean;
    currentValue?: string;
    value: string;
    onChange?: (value: string) => void;
    editable?: boolean;
}

export default function CodeMirrorEditor({
    diffViewEnabled = false,
    commentsEnabled = false,
    currentValue = '',
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
                diff(currentValue, value),
            );
        }

        if (commentsEnabled) {
            extensions.push(
                hoveredLineField,
                commentWidgetsField,
                mouseoverExtension,
                commentGutter,
            );
        }
        return extensions;
    }, [currentValue, commentsEnabled, diffViewEnabled, value]);

    const { setContainer, view } = useCodeMirror({
        container: codeMirrorRef.current,
        extensions,
        value,
        editable,
        onChange,
        theme: codeMirrorTheme,
        height: '100%',
    });

    useComments({
        view,
        commentsEnabled,
    });

    useEffect(() => {
        if (codeMirrorRef.current) {
            setContainer(codeMirrorRef.current);
        }
    }, [setContainer]);

    return (
        <CodeMirrorContainer>
            <div ref={codeMirrorRef} />
        </CodeMirrorContainer>
    );
}
