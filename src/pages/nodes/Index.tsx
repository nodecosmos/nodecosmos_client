import Alert from '../../common/components/Alert';
import VirtualContainer from '../../common/components/VirtualContainer';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import { setHeaderContent } from '../../features/app/appSlice';
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import NodeCard from '../../features/nodes/components/card/NodeCard';
import { setIndexSearchTerm } from '../../features/nodes/nodes.actions';
import { selectIndexNodesById, selectIndexSearchTerm } from '../../features/nodes/nodes.selectors';
import { indexNodes } from '../../features/nodes/nodes.thunks';
import { IndexNode } from '../../features/nodes/nodes.types';
import { NodecosmosDispatch } from '../../store';
import { Box } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CURRENT_PAGE_SIZE = 20;

export default function NodeIndex() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const nodes = useSelector(selectIndexNodesById);
    const [pagingState, setPagingState] = React.useState({ page: 1 });
    const [hasMore, setHasMore, unsetHasMore] = useBooleanStateValue(true);
    const indexSearchTerm = useSelector(selectIndexSearchTerm);

    const indexMoreNodes = useCallback(async () => {
        const response = await dispatch(indexNodes({
            append: true,
            query: {
                q: indexSearchTerm,
                page: pagingState.page,
            },
        }));

        if (response.meta.requestStatus === 'fulfilled' && response.payload) {
            setPagingState((state) => ({
                ...state,
                page: state.page + 1,
            }));
            const nodes = response.payload as IndexNode[];

            if (nodes.length < CURRENT_PAGE_SIZE) {
                unsetHasMore();
            }
        }
    }, [dispatch, indexSearchTerm, pagingState.page, unsetHasMore]);

    const onMore = useMemo(() => {
        return hasMore ? indexMoreNodes : undefined;
    }, [hasMore, indexMoreNodes]);

    useEffect(() => {
        dispatch(setHeaderContent('NodeIndexHeader'));
        dispatch(indexNodes(null));

        return () => {
            dispatch(setHeaderContent(''));
            dispatch(setIndexSearchTerm(undefined));
            setHasMore();
        };
    }, [dispatch, setHasMore]);

    useEffect(() => {
        if (Object.keys(nodes).length < CURRENT_PAGE_SIZE) {
            unsetHasMore();
        } else {
            setHasMore();
        }
    }, [indexSearchTerm, nodes, setHasMore, unsetHasMore]);

    return (
        <Box height={1} display="flex">
            <Box
                width={SIDEBAR_WIDTH}
                borderRight={1}
                height={1}
                borderColor="borders.1"
            />
            <Alert position="sticky" mb={1} />
            <VirtualContainer onMore={onMore}>
                {
                    Object.keys(nodes).map((id) => (
                        <NodeCard key={id} id={id} />
                    ))
                }
            </VirtualContainer>
        </Box>
    );
}
