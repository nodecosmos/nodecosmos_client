import React from 'react';

interface EditorTextProps {
    editorRef: React.RefObject<HTMLDivElement>;
    handleClick: () => void;
    editorClassName?: string;
}

function EditorText(props: EditorTextProps) {
    const {
        editorRef, handleClick, editorClassName,
    } = props;
    return (
        <div className="TextEditor display-flex justify-center" onClick={handleClick}>
            <div className="max-w-900 w-100">
                <div
                    ref={editorRef}
                    className={`ContainerRef DescriptionHTML size-850 ${editorClassName}`} />
            </div>
        </div>
    );
}

export default React.memo(EditorText);
