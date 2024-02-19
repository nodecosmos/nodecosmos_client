import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// decide if we want to use width
export default function DescriptionContainer({
    children, p, maxWidth, justifyContent,
}) {
    return (
        <Box
            p={p}
            sx={{
                display: 'flex',
                justifyContent,
            }}
        >
            <Box
                height={1}
                sx={{
                    maxWidth,
                    width: 1,
                    color: 'text.secondary',
                    hr: {
                        border: 0,
                        borderBottom: 1,
                        borderColor: 'borders.2',
                    },
                    blockquote: {
                        m: 0,
                        backgroundColor: 'markdownContent.canvas',
                        borderRadius: 1,
                        borderLeft: 8,
                        p: 1,
                        pl: 2,
                        borderColor: 'markdownContent.border',
                    },
                    table: {
                        tr: {
                            borderRadius: 1,
                            'td, th': {
                                mt: 1,
                                borderBottom: 1,
                                borderRight: 1,
                                borderColor: 'borders.2',
                                p: '12px 16px',
                            },
                            'td:last-of-type': { borderRight: 0 },
                            'th:last-of-type': { borderRight: 0 },
                            '&:last-of-type td': { borderBottom: 0 },
                            '&:hover': { backgroundColor: 'background.8' },
                        },
                    },
                    pre: {
                        ml: 0,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'markdownContent.canvas',
                        textWrap: 'wrap',
                    },
                    a: {
                        color: 'text.link',
                        fontWeight: 'bold',
                    },
                    p: {
                        wordWrap: 'break-word',
                        fontWeight: '500',
                    },
                    'img:not(.ProseMirror-separator)': {
                        maxWidth: 850,
                        width: 1,
                        borderRadius: 5,
                        my: 2,
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

DescriptionContainer.defaultProps = {
    p: 6,
    width: 1,
    maxWidth: 850,
    justifyContent: 'center',
};

DescriptionContainer.propTypes = {
    children: PropTypes.node.isRequired,
    p: PropTypes.number,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    justifyContent: PropTypes.string,
};
