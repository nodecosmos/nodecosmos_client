import Loader from '../../../../../common/components/Loader';
import usePrevious from '../../../../../common/hooks/usePrevious';
import { ObjectType } from '../../../../../types';
import { selectDescription } from '../../../../descriptions/descriptions.selectors';
import useDescription from '../../../../descriptions/hooks/useDescription';
import NodePaneCoverImage from '../../../../nodes/components/cover/NodePaneCoverImage';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function PaneDescription() {
    const {
        mainObjectId: objectId,
        branchId,
        objectType,
        loading,
    } = usePaneContext();
    useDescription();
    const description = useSelector(selectDescription(branchId, objectId));
    const innerHTML = useMemo(() => ({ __html: description?.html as TrustedHTML }), [description]);
    const isEmpty = !description?.html || description?.html === '<p></p>';
    const prevObjId = usePrevious(objectId);
    const reMounted = prevObjId === objectId || !!description?.html;

    return (
        <Box px={4}>
            {objectType === ObjectType.Node && <NodePaneCoverImage />}

            <Box display="flex" justifyContent="center" mt={3}>
                {
                    !loading && !isEmpty && reMounted && (
                        <div className="DescriptionHTML size-850 fs-18" dangerouslySetInnerHTML={innerHTML} />
                    )
                }
                {
                    !loading && isEmpty && reMounted && (
                        <div className="w-100 size-850 fs-18 text-tertiary center p-1">
                            <Typography variant="h6" color="text.tertiary" textAlign="center">
                                Selected object has no description.
                            </Typography>
                            <Typography variant="h5" color="text.tertiary" textAlign="center" mt={1}>
                                ¯\_(ツ)_/¯
                            </Typography>
                        </div>
                    )
                }
                {
                    loading && (
                        <Loader />
                    )
                }
            </Box>
        </Box>
    );
}
