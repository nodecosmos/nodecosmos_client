import TreeNodes from './TreeNodes';
import TreeToolbar from './TreeToolbar';
import Alert from '../../../../common/components/Alert';
import OverlayLoader from '../../../../common/components/OverlayLoader';
import Transformable from '../../../../common/components/Transformable';
import { UUID } from '../../../../types';
import { HEADER_HEIGHT, MOBILE_TOOLBAR_HEIGHT } from '../../../app/constants';
import useIsMobile from '../../../app/hooks/useIsMobile';
import { TreeContext, useTreeContextValue } from '../../hooks/tree/useTreeContext';
import { selectScale } from '../../nodes.selectors';
import { TreeType } from '../../nodes.types';
import React, { useMemo } from 'react';
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

const TREE_MOBILE_STYLE = {
    height: `calc(100% - ${MOBILE_TOOLBAR_HEIGHT})`,
    position: 'relative',
};

export default function Tree(props: TreeProps) {
    const {
        branchId, rootId, type = TreeType.Default, onChange, value = null,
    } = props;
    const ctxValue = useTreeContextValue({
        branchId,
        rootId,
        type,
        onChange,
        value,
    });
    const isTreeLoading = false; // TODO on reorder
    const treeScale = useSelector(selectScale);
    const isMobile = useIsMobile();
    const style = useMemo(() => (isMobile ? TREE_MOBILE_STYLE : TREE_STYLE), [isMobile]);

    console.log('Tree');

    return (
        <TreeContext.Provider value={ctxValue}>
            <div className="Tree">
                <TreeToolbar />
                <Alert />
                {/* @ts-expect-error style position not recognized */ }
                <div style={style}>
                    {isTreeLoading ? <OverlayLoader /> : null}
                    <Transformable scale={treeScale}>
                        <TreeNodes />
                    </Transformable>
                </div>
            </div>
        </TreeContext.Provider>
    );
}
