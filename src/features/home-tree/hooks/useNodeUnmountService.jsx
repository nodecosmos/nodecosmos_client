import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { terminateNewNode } from '../landingPageNodeSlice';

export default function useNodeUnmountService(props) {
    const { id } = props;
    const dispatch = useDispatch();

    useLayoutEffect(() => () => {
    // dispatch(collapseNode({ id }));
        dispatch(terminateNewNode());
    }, [dispatch, id]);
}
