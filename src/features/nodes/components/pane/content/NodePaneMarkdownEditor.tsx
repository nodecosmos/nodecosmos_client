import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { selectNodeAttribute, selectSelected } from '../../../nodes.selectors';
import { getOriginalDescription } from '../../../nodes.thunks';
import { PKWithTreeBranch } from '../../../nodes.types';
import { Box } from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const {
        isBranched, mainBranchId, branchId,
    } = useBranchParams();
    const { id } = useSelector(selectSelected) as PKWithTreeBranch;
    const currentDescriptionMarkdown = useSelector(selectNodeAttribute(mainBranchId, id, 'descriptionMarkdown'));
    const descriptionMarkdown = useSelector(selectNodeAttribute(branchId, id, 'descriptionMarkdown'));
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (isBranched) {
            dispatch(getOriginalDescription({
                treeBranchId: mainBranchId,
                branchId,
                id,
            }));
        }
    }, [branchId, dispatch, id, isBranched, mainBranchId]);

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <CustomCodeMirror
                    currentValue={currentDescriptionMarkdown}
                    value={descriptionMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
