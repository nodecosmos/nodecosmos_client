import { terminateNewNode } from '../landingPageNodeSlice';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeUnmountService(props) {
    const { id } = props;
    const dispatch = useDispatch();

    useLayoutEffect(() => () => {
    // dispatch(collapseNode({ id }));
        dispatch(terminateNewNode());
    }, [dispatch, id]);
}
