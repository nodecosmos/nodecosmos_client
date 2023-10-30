import Loader from '../../../../../common/components/Loader';
import extractTextFromHtml from '../../../../../utils/extractTextFromHtml';
import { uint8ArrayToBase64 } from '../../../../../utils/serializer';
import { updateNodeState } from '../../../nodeActions';
import { selectNodeAttribute, selectSelectedNodeId } from '../../../nodes.selectors';
import { getNodeDescriptionBase64, updateNodeDescription } from '../../../nodes.thunks';
import { Box } from '@mui/material';
import React, {
    Suspense, useCallback, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RemirrorEditor = React.lazy(
    () => import('../../../../../common/components/remirror/RemirrorEditor'),
);

export default function NodePaneDescriptionEditor() {
    const id = useSelector(selectSelectedNodeId);

    const isTemp = useSelector(selectNodeAttribute(id, 'isTemp'));
    const rootId = useSelector(selectNodeAttribute(id, 'rootId'));

    const dispatch = useDispatch();
    const handleChangeTimeout = React.useRef(null);
    const descriptionMarkdown = useSelector(selectNodeAttribute(id, 'descriptionMarkdown'));
    const descriptionBase64 = useSelector(selectNodeAttribute(id, 'descriptionBase64'));

    const handleChange = useCallback((remirrorHelpers, uint8ArrayState) => {
        if (isTemp) return;

        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = remirrorHelpers.getHTML();
            const shortDescription = extractTextFromHtml(descriptionHtml);
            const markdown = remirrorHelpers.getMarkdown();

            dispatch(updateNodeState({
                id,
                description: descriptionHtml,
                shortDescription,
                descriptionMarkdown: markdown,
            }));

            dispatch(updateNodeDescription({
                id,
                description: descriptionHtml,
                shortDescription,
                descriptionMarkdown: markdown,
                descriptionBase64: uint8ArrayToBase64(uint8ArrayState),
            }));
        }, 1000);
    }, [dispatch, id, isTemp]);

    const [base64Fetched, setBase64Fetched] = React.useState(false);

    useEffect(() => {
        if (id && rootId) {
            dispatch(getNodeDescriptionBase64(id)).then(() => {
                setBase64Fetched(true);
            });
        }

        return () => {
            setBase64Fetched(false);
        };
    }, [dispatch, id, rootId]);

    if (!!descriptionMarkdown && !base64Fetched) return <Loader />;

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <RemirrorEditor
                    markdown={descriptionMarkdown || ''}
                    onChange={handleChange}
                    wsRoomId={id}
                    wsAuthNodeId={id}
                    base64={descriptionBase64}
                    isRealTime
                />
            </Box>
        </Suspense>
    );
}
