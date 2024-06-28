import { BranchContext, useBranchContextValue } from '../../features/branch/hooks/useBranchContext';
import NodeShowContent from '../../features/nodes/components/NodeShowContent';
import React from 'react';

export default function NodeShow() {
    const ctxValue = useBranchContextValue();

    return (
        <BranchContext.Provider value={ctxValue}>
            <NodeShowContent />
        </BranchContext.Provider>
    );
}
