import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import extractTextFromHtml from '../../../../../utils/extractTextFromHtml';
import { uint8ArrayToBase64 } from '../../../../../utils/serializer';
import { updateState } from '../../../actions';
import { selectNodeAttribute, selectSelected } from '../../../nodes.selectors';
import { getDescriptionBase64, updateDescription } from '../../../nodes.thunks';
import { PKWithTreeBranch } from '../../../nodes.types';
import { Box } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, {
    Suspense, useCallback, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(
    () => import('../../../../../common/components/remirror/RemirrorEditor'),
);

export default function NodePaneDescriptionEditor() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        treeBranchId, branchId, id,
    } = useSelector(selectSelected) as PKWithTreeBranch;
    const isTmp = useSelector(selectNodeAttribute(treeBranchId, id, 'isTmp'));
    const rootId = useSelector(selectNodeAttribute(treeBranchId, id, 'rootId'));
    const descriptionMarkdown = useSelector(selectNodeAttribute(treeBranchId, id, 'descriptionMarkdown'));
    const descriptionBase64 = useSelector(selectNodeAttribute(treeBranchId, id, 'descriptionBase64'));
    const handleChangeTimeout = React.useRef<number| null>(null);

    const handleChange = useCallback((
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => {
        if (isTmp) return;

        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = helpers.getHTML();
            const shortDescription = extractTextFromHtml(descriptionHtml);
            const markdown = helpers.getMarkdown();

            dispatch(updateState({
                treeBranchId,
                id,
                description: descriptionHtml,
                shortDescription,
                descriptionMarkdown: markdown,
            }));

            dispatch(updateDescription({
                treeBranchId,
                branchId,
                id,
                description: descriptionHtml,
                shortDescription,
                descriptionMarkdown: markdown,
                descriptionBase64: uint8ArrayState ? uint8ArrayToBase64(uint8ArrayState) : null,
            }));
        }, 1000);
    }, [dispatch, treeBranchId, branchId, id, isTmp]);

    const [base64Fetched, setBase64Fetched] = React.useState(false);

    useEffect(() => {
        if (id && rootId) {
            dispatch(getDescriptionBase64({
                treeBranchId,
                branchId,
                id,
            })).then(() => {
                setBase64Fetched(true);
            });
        }

        return () => {
            setBase64Fetched(false);
        };
    }, [branchId, dispatch, id, rootId, treeBranchId]);

    if (!!descriptionMarkdown && !base64Fetched) return <Loader />;

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <RemirrorEditor
                    markdown={descriptionMarkdown || ''}
                    onChange={handleChange}
                    wsRoomId={id}
                    wsAuthNodeId={id}
                    wsAuthNodeBranchId={branchId}
                    base64={descriptionBase64}
                    isRealTime
                />
            </Box>
        </Suspense>
    );
}
