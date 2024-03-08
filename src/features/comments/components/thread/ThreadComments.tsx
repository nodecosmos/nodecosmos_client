import { MAX_COMMENT_WIDTH } from '../../commentsSlice';
import { useThreadContext, useThreadCommands } from '../../hooks/thread/useThreadContext';
import Comment from '../Comment';
import CommentReply from '../CommentReply';
import { faArrowsToDottedLine, faArrowsFromDottedLine } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import React from 'react';

const ExpContainer = ({ children, withBorder }: {children: React.ReactNode, withBorder?: boolean}) => {
    return (
        <Box
            borderRadius={1.5}
            border={withBorder ? 1 : 0}
            width={1}
            maxWidth={MAX_COMMENT_WIDTH}
            borderColor="borders.4"
            sx={{
                p: 1,
                svg: {
                    marginRight: 1,
                    color: 'text.tertiary',
                },
                button: { color: 'text.tertiary' },
            }}>
            {children}
        </Box>
    );
};

export default function ThreadComments() {
    const {
        id, commentIds, commentCount, collapsed,
    } = useThreadContext();

    const { collapse, expand } = useThreadCommands();

    if (collapsed) {
        return (
            <ExpContainer withBorder>
                <button onClick={expand}>
                    <FontAwesomeIcon icon={faArrowsFromDottedLine} />
                    Expand
                </button>
            </ExpContainer>
        );
    }

    return (
        <Box
            overflow="hidden"
            maxWidth={MAX_COMMENT_WIDTH}
            border={1}
            borderRadius={1.5}
            borderColor="borders.4">
            <ExpContainer>
                <button onClick={collapse}>
                    <FontAwesomeIcon icon={faArrowsToDottedLine} />
                    Collapse
                </button>
            </ExpContainer>
            {
                commentIds.map((commentId, index) => <Comment
                    key={commentId}
                    id={commentId}
                    isLast={commentCount === index + 1} />)
            }
            <CommentReply id={id} />
        </Box>
    );
}
