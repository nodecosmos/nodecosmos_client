import Loader from '../../../../../common/components/Loader';
import usePrevious from '../../../../../common/hooks/usePrevious';
import { ObjectType } from '../../../../../types';
import { selectDescription } from '../../../../descriptions/descriptions.selectors';
import useDescription from '../../../../descriptions/hooks/useDescription';
import NodePaneCoverImage from '../../../../nodes/components/cover/NodePaneCoverImage';
import { selectTheme } from '../../../app.selectors';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

let HLJS: typeof import('highlight.js') | null = null;

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
    const theme = useSelector(selectTheme);

    useEffect(() => {
        setTimeout(async () => {
            const codeBlocks = document.getElementsByTagName('pre');

            if (codeBlocks.length > 0) {
                HLJS ||= await import('highlight.js');

                Array.from(codeBlocks).forEach((pre) => {
                    HLJS!.default.highlightElement(pre);
                });
            }
        }, 10);
    }, [description, theme]);

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
                            <Typography variant="h6" color="texts.tertiary" textAlign="center">
                                Selected object has no description.
                            </Typography>
                            <Typography variant="h5" color="texts.tertiary" textAlign="center" mt={1}>
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
