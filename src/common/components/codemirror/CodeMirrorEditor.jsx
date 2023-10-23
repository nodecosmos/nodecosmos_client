import React, { useRef } from 'react';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import CodeMirror from '@uiw/react-codemirror';
import PropTypes from 'prop-types';
import useCodeMirrorTheme from '../../hooks/codemirror/useCodeMirrorTheme';
import CodeMirrorContainer from './CodeMirrorContainer';

export default function CodeMirrorEditor({
    value,
    onChange,
    editable,
}) {
    const codeMirrorRef = useRef(null);
    const codeMirrorTheme = useCodeMirrorTheme();

    return (
        <CodeMirrorContainer>
            <CodeMirror
                editable={editable}
                ref={codeMirrorRef}
                value={value}
                onChange={onChange}
                theme={codeMirrorTheme}
                extensions={[markdown({ markdownLanguage })]}
                height="100%"
            />
        </CodeMirrorContainer>
    );
}

CodeMirrorEditor.defaultProps = {
    value: '',
    onChange: null,
    editable: true,
};

CodeMirrorEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
};
