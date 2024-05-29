import TreeNodes from './TreeNodes';
import TreeToolbar from './TreeToolbar';
import Alert from '../../../../common/components/Alert';
import OverlayLoader from '../../../../common/components/OverlayLoader';
import Transformable from '../../../../common/components/Transformable';
import { UUID } from '../../../../types';
import { HEADER_HEIGHT } from '../../../app/constants';
import { useTreeContextCreator } from '../../hooks/tree/useTreeContext';
import { selectScale } from '../../nodes.selectors';
import { TreeType } from '../../nodes.types';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

export interface TreeProps {
    branchId: UUID;
    rootId: UUID;
    type?: TreeType;
    onChange?: (ids: UUID[]) => void;
    value?: UUID[] | null;
}

const TREE_STYLE = {
    height: `calc(100% - ${HEADER_HEIGHT})`,
    position: 'relative',
};

function Tree(props: TreeProps) {
    const {
        branchId, rootId, type = TreeType.Default, onChange, value = null,
    } = props;
    const { TreeContext, ctxValue } = useTreeContextCreator({
        branchId,
        rootId,
        type,
        onChange,
        value,
    });
    const isTreeLoading = false; // TODO on reorder
    const treeScale = useSelector(selectScale);

    return (
        <TreeContext.Provider value={ctxValue}>
            <div className="Tree">
                <TreeToolbar />
                <Alert />
                {/* @ts-expect-error style position not recognized */ }
                <div style={TREE_STYLE}>
                    {isTreeLoading ? <OverlayLoader /> : null}
                    <Transformable scale={treeScale}>
                        <TreeNodes />
                    </Transformable>
                </div>
            </div>
        </TreeContext.Provider>
    );
}

export default memo(Tree);
