import useDescriptionInsertCommentPortal from './description/useDescriptionInsertCommentPortal';
import useDescriptionThreadsPortals from './description/useDescriptionThreadsPortals';
import { EditorView } from '@uiw/react-codemirror';

export interface CommentProps {
    view?: EditorView;
    commentsEnabled: boolean;
}

export default function useDescriptionComments({ view, commentsEnabled }: CommentProps) {
    //Creates a portal for inserting a comment in the description
    const createCommentPortal = useDescriptionInsertCommentPortal({
        view,
        commentsEnabled,
    });

    // Creates portals for showing comment threads in the description
    const showThreadsPortals = useDescriptionThreadsPortals({
        view,
        commentsEnabled,
    });

    return {
        createCommentPortal,
        showThreadsPortals,
    };
}
