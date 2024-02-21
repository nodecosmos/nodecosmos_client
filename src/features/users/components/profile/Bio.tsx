import Loader from '../../../../common/components/Loader';
import { EnabledExtensions } from '../../../../common/hooks/remirror/useExtensions';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useDebounce from '../../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../../store';
import useProfileUser from '../../hooks/useProfileUser';
import { updateBio } from '../../users.thunks';
import { faClose, faUserEdit } from '@fortawesome/pro-thin-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../../common/components/editor/RemirrorEditor'));

export default function Bio() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const user = useProfileUser();
    const [editorOpen, openBioEditor, closeBioEditor] = useBooleanStateValue();

    const handleUpdateBio = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        dispatch(updateBio({
            id: user.id,
            username: user.username,
            bio: helpers.getHTML(),
        }));
    }, [dispatch, user]);

    const [handleUpdateBioDebounced] = useDebounce(handleUpdateBio);

    const {
        Bold, Italic, Strike, Markdown, Blockquote, Link, OrderedList,
    } = EnabledExtensions;

    return (
        <Box mt={4} width={1}>
            {!editorOpen
                && (
                    <Box width={1}>
                        {
                            user.bio && (
                                <Box
                                    p={2}
                                    width={1}
                                    border={1}
                                    borderColor="borders.1"
                                    borderRadius={2}>
                                    <Box
                                        className="DescriptionHTML"
                                        dangerouslySetInnerHTML={{ __html: user.bio }} />
                                </Box>
                            )
                        }
                        <Button
                            sx={{
                                mt: 2,
                                px: 2,
                                py: 2.1,
                            }}
                            onClick={openBioEditor}
                            component="label"
                            variant="outlined"
                            color="buttonContrast"
                            startIcon={<FontAwesomeIcon icon={faUserEdit} />}
                        >
                               Edit Bio
                        </Button>
                    </Box>
                )
            }
            {
                editorOpen && (
                    <Suspense fallback={<Loader />}>
                        <Box width={1} border={1} borderColor="borders.1" borderRadius={2} borderTop={0}>
                            <RemirrorEditor
                                markdown={user.bio}
                                onChange={handleUpdateBioDebounced}
                                extensions={[
                                    Bold,
                                    Italic,
                                    Strike,
                                    Markdown,
                                    Blockquote,
                                    Link,
                                    OrderedList,
                                ]}
                                p={2}
                            />
                        </Box>
                        <Button
                            sx={{ mt: 2 }}
                            onClick={closeBioEditor}
                            component="label"
                            variant="outlined"
                            color="error"
                            startIcon={<FontAwesomeIcon icon={faClose} />}
                        >
                            Close
                        </Button>
                    </Suspense>
                )
            }
        </Box>
    );
}
