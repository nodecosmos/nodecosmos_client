import TreeNodes from './TreeNodes';
import TreeToolbar from './TreeToolbar';
import Alert from '../../../../common/components/Alert';
import OverlayLoader from '../../../../common/components/OverlayLoader';
import Transformable from '../../../../common/components/Transformable';
import { UUID } from '../../../../types';
import { HEADER_HEIGHT } from '../../../app/constants';
import { useTreeContextCreator } from '../../hooks/useTreeContext';
import { TreeType } from '../../nodes.types';
import { Box } from '@mui/material';
import React, { memo } from 'react';

export interface TreeProps {
    treeBranchId: UUID;
    rootNodeId: UUID;
    type?: TreeType;
    onChange?: (ids: UUID[]) => void;
    value?: UUID[] | null;
}

function Tree(props: TreeProps) {
    const {
        treeBranchId, rootNodeId, type = TreeType.Default, onChange, value = null,
    } = props;
    const { TreeContext, ctxProviderValue } = useTreeContextCreator({
        treeBranchId,
        rootNodeId,
        type,
        onChange,
        value,
    });

    const isTreeLoading = false; // TODO

    return (

        <TreeContext.Provider value={ctxProviderValue}>
            <div className="Tree">
                <TreeToolbar />
                <Alert />
                <Box position="relative" height={`calc(100% - ${HEADER_HEIGHT})`}>
                    {isTreeLoading ? <OverlayLoader /> : null}
                    <Transformable transformableId={treeBranchId}>
                        <TreeNodes />
                    </Transformable>
                </Box>
            </div>
        </TreeContext.Provider>
    );
}

export default memo(Tree);
