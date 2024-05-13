import { selectObject } from '../../features/app/app.thunks';
import { SELECTED_OBJ_Q } from '../../features/app/hooks/useSelectObject';
import { useBranchContextCreator } from '../../features/branch/hooks/useBranchContext';
import NodeShowContent from '../../features/nodes/components/NodeShowContent';
import { NodecosmosDispatch } from '../../store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function NodeShow() {
    const { BranchContext, ctxValue } = useBranchContextCreator();
    const [searchParams] = useSearchParams();
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        const selectedObj = searchParams.get(SELECTED_OBJ_Q);

        if (selectedObj) {
            dispatch(selectObject(JSON.parse(selectedObj)));
        }

        // eslint-disable-next-line
    }, [selectObject]);

    return (
        <BranchContext.Provider value={ctxValue}>
            <NodeShowContent />
        </BranchContext.Provider>
    );
}
