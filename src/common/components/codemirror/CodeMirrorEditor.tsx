import CodeMirrorContainer from './CodeMirrorContainer';
import useDescriptionComments from '../../../features/comments/hooks/useDescriptionComments';
import useCodeMirrorTheme from '../../hooks/codemirror/useCodeMirrorTheme';
import diff from '../../lib/codemirror/extensions/diff';
import { click, hover } from '../../lib/codemirror/extensions/events';
import { commentGutter } from '../../lib/codemirror/extensions/gutter';
import {
    commentWidgetsField, hoveredLineField, selectedLineField,
} from '../../lib/codemirror/stateFields';
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
                selectedLineField,
                commentWidgetsField,
                click,
                hover,
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

    const createCommentPortal = useDescriptionComments({
        view,
        commentsEnabled,
    });

    useEffect(() => {
        if (codeMirrorRef.current) {
            setContainer(codeMirrorRef.current);
        }
    }, [setContainer]);

    return (
        <div>
            <CodeMirrorContainer>
                <div ref={codeMirrorRef} />
            </CodeMirrorContainer>
            {createCommentPortal}
        </div>

    );
}
