import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { selectSelected, selectSelectedNode } from '../../nodes.selectors';
import { PKWithTreeBranch } from '../../nodes.types';
import {
    createContext, useCallback, useContext,
} from 'react';
import { useSelector } from 'react-redux';

interface CtxValue {
    loading: boolean;
    setLoading: () => void;
    unsetLoading: () => void;
}

const NodePaneContext = createContext<CtxValue>({} as CtxValue);

export function useNodePaneContextCreator() {
    const [loading, setLoading, _unsetLoading] = useBooleanStateValue();

    const unsetLoading = useCallback(() => {
        setTimeout(_unsetLoading, 200);
    }, [_unsetLoading]);

    return {
        NodePaneContext,
        ctxValue: {
            loading,
            setLoading,
            unsetLoading,
        },
    };
}

export function useNodePaneContext() {
    const {
        loading,
        setLoading,
        unsetLoading,
    } = useContext(NodePaneContext);
    const selectedPk = useSelector(selectSelected) as PKWithTreeBranch;
    const {
        rootId, isTmp, title, description,
    } = useSelector(selectSelectedNode);
    const {
        treeBranchId, branchId, id,
    } = selectedPk;

    return {
        treeBranchId, // branchId of the current tree
        rootId,
        id,
        branchId, // branchId of the selected node
        isTmp,
        title,
        description,
        loading,
        setLoading,
        unsetLoading,
    };
}
