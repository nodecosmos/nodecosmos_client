import { setCurrentNode } from '../../features/app/appSlice';
import { BranchContext, useBranchContextValue } from '../../features/branch/hooks/useBranchContext';
import NodeShowContent from '../../features/nodes/components/NodeShowContent';
import useNodeSSE from '../../features/nodes/hooks/sse/useNodeSSE';
import { pushRecentNode } from '../../features/nodes/nodes.actions';
import { NodecosmosDispatch } from '../../store';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function NodeShow() {
    const ctxValue = useBranchContextValue();
    const {
        isBranch, branchId, nodeId,
    } = ctxValue;
    const dispatch: NodecosmosDispatch = useDispatch();
    const timeout = useRef<number | null>(null);

    useNodeSSE(ctxValue?.originalId);

    useEffect(() => {
        if (!isBranch) {
            timeout.current = setTimeout(() => {
                dispatch(pushRecentNode([branchId, nodeId]));
            }, 5000);
        }

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            dispatch(setCurrentNode(null));
        };
    }, [branchId, dispatch, isBranch, nodeId]);

    return (
        <BranchContext.Provider value={ctxValue}>
            <NodeShowContent />
        </BranchContext.Provider>
    );
}
