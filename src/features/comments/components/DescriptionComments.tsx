import useInsertCommentPortal from '../hooks/description/useInsertCommentPortal';
import useThreadsPortals from '../hooks/description/useThreadsPortals';
import { EditorView } from '@uiw/react-codemirror';
import React from 'react';

export const EMPTY_LINE_PLACEHOLDER = 'EMPTY_LINE_PLACEHOLDER';

interface DescriptionCommentsProps {
    view: EditorView;
}

export default function DescriptionComments({ view }: DescriptionCommentsProps) {
    const insertCommentPortal = useInsertCommentPortal(view);
    const commentThreadsPortal = useThreadsPortals(view);

    return (
        <div>
            {insertCommentPortal}
            {commentThreadsPortal}
        </div>
    );
}
