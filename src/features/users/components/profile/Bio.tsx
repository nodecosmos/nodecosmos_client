import { ContentType } from '../../../../common/components/editor/Editor';
import { EditorExtensions } from '../../../../common/components/editor/types';
import Loader from '../../../../common/components/Loader';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useDebounce from '../../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../../store';
import useProfileUser from '../../hooks/useProfileUser';
import { selectCurrentUser } from '../../users.selectors';
import { updateBio } from '../../users.thunks';
import { Box, Typography } from '@mui/material';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Editor = React.lazy(() => import('../../../../common/components/editor/Editor'));

const {
    Bold, Italic, Strike, Markdown, Blockquote, Link, BulletList, OrderedList,
} = EditorExtensions;

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

    const handleUpdateBio = useCallback(async (bio: string) => {
        await dispatch(updateBio({
            id: user.id,
            username: user.username,
            bio,
        }));

        unsetLoading();
    }, [dispatch, unsetLoading, user.id, user.username]);

    const [handleUpdateBioDebounced] = useDebounce(handleUpdateBio);

    const handleBio = useCallback((bio: string) => {
        setLoading();

        return handleUpdateBioDebounced(bio);
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
                            <Typography color="texts.tertiary" variant="body2">
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
                            <Editor
                                content={user.bio}
                                contentType={ContentType.HTML}
                                fileObjectId={user.id}
                                onBlur={closeBioEditor}
                                onChange={handleBio}
                                extensions={ENABLED_EXTENSIONS}
                                p={1}
                                toolbarHeight={38}
                                editorBackgroundColor="backgrounds.2"
                            />
                        </Box>
                    </Suspense>
                )
            }
        </Box>
    );
}
