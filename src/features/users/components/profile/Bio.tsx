import Loader from '../../../../common/components/Loader';
import { EnabledExtensions } from '../../../../common/hooks/editor/useExtensions';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useDebounce from '../../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../../store';
import useProfileUser from '../../hooks/useProfileUser';
import { selectCurrentUser } from '../../users.selectors';
import { updateBio } from '../../users.thunks';
import { Box, Typography } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../../common/components/editor/RemirrorEditor'));

const {
    Bold, Italic, Strike, Markdown, Blockquote, Link, BulletList, OrderedList,
} = EnabledExtensions;

const ENABLED_EXTENSIONS = [
    Bold,
    Italic,
    Strike,
    Markdown,
    Blockquote,
    Link,
    BulletList,
    OrderedList,
];

export default function Bio() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const user = useProfileUser();
    const [editorOpen, openBioEditor, closeBioEditor] = useBooleanStateValue();
    const currentUser = useSelector(selectCurrentUser);
    const bioEmpty = !user.bio || user.bio === '<p></p>';
    const handleOpenEditor = useCallback(() => {
        const isCurrentUser = currentUser?.id === user.id;
        if (isCurrentUser) {
            openBioEditor();
        }
    }, [currentUser?.id, openBioEditor, user.id]);
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

    const handleUpdateBio = useCallback(async (helpers: HelpersFromExtensions<MarkdownExtension>) => {
        await dispatch(updateBio({
            id: user.id,
            username: user.username,
            bio: helpers.getHTML(),
        }));

        unsetLoading();
    }, [dispatch, unsetLoading, user.id, user.username]);

    const [handleUpdateBioDebounced] = useDebounce(handleUpdateBio);

    const handleBio = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        setLoading();

        return handleUpdateBioDebounced(helpers);
    }, [handleUpdateBioDebounced, setLoading]);

    return (
        <Box mt={4} width={1}>
            {!editorOpen
                && (
                    <Box
                        width={1}
                        border={1}
                        borderRadius={2}
                        borderColor="transparent"
                        onClick={handleOpenEditor}
                        sx={{
                            transition: 'border-color 0.2s',
                            borderColor: 'borders.3',
                            p: 2,
                            '&:hover': { borderColor: 'borders.5' },
                        }}>
                        {loading && <Box height={20} width={20} mb={2}><Loader color="primary.main" size={20} /></Box> }
                        {bioEmpty && (
                            <Typography color="text.tertiary" variant="body2">
                                {
                                    user.id === currentUser?.id
                                        ? 'Click to add a bio'
                                        : 'No bio'
                                }
                            </Typography>
                        )}
                        <div
                            className="DescriptionHTML"
                            dangerouslySetInnerHTML={{ __html: (!bioEmpty && user.bio) || '' as TrustedHTML }} />

                    </Box>
                )
            }
            {
                editorOpen && (
                    <Suspense fallback={<Loader />}>
                        <Box
                            width={1}
                            border={1}
                            borderColor="borders.1"
                            borderRadius={2}>
                            <RemirrorEditor
                                fileObjectId={user.id}
                                onBlur={closeBioEditor}
                                markdown={user.bio}
                                onChange={handleBio}
                                enabledExtensions={ENABLED_EXTENSIONS}
                                p={1}
                                toolbarHeight={38}
                                editorBackgroundColor="background.2"
                            />
                        </Box>
                    </Suspense>
                )
            }
        </Box>
    );
}
