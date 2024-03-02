import useInsertCommentPortal from './description/useInsertCommentPortal';
import useThreadsPortals from './description/useThreadsPortals';
import { EditorView } from '@uiw/react-codemirror';

export interface CommentProps {
    view?: EditorView;
    commentsEnabled: boolean;
}

export default function useDescriptionComments({ view, commentsEnabled }: CommentProps) {
    //Creates a portal for inserting a comment in the description
    const createCommentPortal = useInsertCommentPortal({
        view,
        commentsEnabled,
    });

    // Creates portals for showing comment threads in the description
    const showThreadsPortals = useThreadsPortals({
        view,
        commentsEnabled,
    });

    return {
        createCommentPortal,
        showThreadsPortals,
    };
}
