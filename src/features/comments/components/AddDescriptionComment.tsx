import Loader from '../../../common/components/Loader';
import { EnabledExtensions } from '../../../common/hooks/editor/useExtensions';
import { faSave } from '@fortawesome/pro-thin-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../common/components/editor/RemirrorEditor'));

interface AddDescriptionCommentProps {
    closeInsertComment: () => void;
}

export default function AddDescriptionComment({ closeInsertComment }: AddDescriptionCommentProps) {
    const {
        Bold, Italic, Strike, Markdown, Blockquote, Link, OrderedList,
    } = EnabledExtensions;
    const [content, setContent] = React.useState('');

    const handleChange = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        setContent(helpers.getText());
    }, []);

    return (
        <Box py={0.5}>
            <Box
                border={1}
                borderColor="borders.4"
                p={1}
                sx={{ backgroundColor: 'background.1' }}
                boxSizing="border-box">
                <Suspense fallback={<Loader />}>
                    <Box maxWidth={780}>
                        <Box
                            overflow="hidden"
                            border={1}
                            borderColor="borders.4"
                            borderRadius={1.50}
                            width={1}
                        >
                            <RemirrorEditor
                                markdown={content}
                                onChange={handleChange}
                                enabledExtensions={[
                                    Bold,
                                    Italic,
                                    Strike,
                                    Markdown,
                                    Blockquote,
                                    Link,
                                    OrderedList,
                                ]}
                                p={1}
                                toolbarHeight={38}
                                editorBackgroundColor="background.1"
                                info="Add contribution request review."
                            />
                        </Box>
                        <Box
                            mt={1}
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <Button variant="outlined" color="buttonContrast" onClick={closeInsertComment}>
                                Cancel
                            </Button>
                            <Button
                                sx={{ ml: 1 }}
                                variant="outlined"
                                color="primary"
                                startIcon={<FontAwesomeIcon icon={faSave} />}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Suspense>
            </Box>
        </Box>
    );
}
