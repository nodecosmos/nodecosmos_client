import Alert from '../../common/components/Alert';
import Loader from '../../common/components/Loader';
import VirtualContainer from '../../common/components/VirtualContainer';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import { setHeaderContent } from '../../features/app/appSlice';
import {
    DISPLAY_MD_SX,
    MD_WO_SIDEBAR_WIDTH_SX, MOBILE_WO_HEADER_HEIGHT_SX, SIDEBAR_WIDTH,
} from '../../features/app/constants';
import NodeCard from '../../features/nodes/components/card/NodeCard';
import NodeIndexMobileFooter from '../../features/nodes/components/header/NodeIndexMobileFooter';
import RecentNodes from '../../features/nodes/components/RecentNodes';
import { setIndexSearchTerm } from '../../features/nodes/nodes.actions';
import { selectIndexNodesById, selectIndexSearchTerm } from '../../features/nodes/nodes.selectors';
import { indexNodes, IndexNodesPayload } from '../../features/nodes/nodes.thunks';
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
    const length = useMemo(() => Object.keys(nodes).length, [nodes]);
    const [pagingState, setPagingState] = React.useState({ page: Math.round(length / CURRENT_PAGE_SIZE) || 1 });
    const [hasMore, setHasMore, unsetHasMore] = useBooleanStateValue(true);
    const indexSearchTerm = useSelector(selectIndexSearchTerm);
    const [fetched, setFetched, _unsetFetched] = useBooleanStateValue();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);

    const indexMoreNodes = useCallback(async () => {
        const query: IndexNodesPayload['query'] = { page: pagingState.page };

        if (indexSearchTerm) {
            query.q = indexSearchTerm;
        }

        const response = await dispatch(indexNodes({
            append: true,
            query,
        }));

        if (response.meta.requestStatus === 'fulfilled' && response.payload) {
            setPagingState((state) => ({
                ...state,
                page: state.page + 1,
            }));
            const resNodes = response.payload as IndexNode[];

            if (resNodes.length < CURRENT_PAGE_SIZE) {
                unsetHasMore();
            }
        }
    }, [dispatch, indexSearchTerm, pagingState.page, unsetHasMore]);

    useEffect(() => {
        if (!fetched) {
            setLoading();
            dispatch(indexNodes({ append: false })).then(() => {
                setFetched();
                unsetLoading();
                setHasMore();
            });
        }

        return () => {
            setHasMore();
        };
    }, [dispatch, fetched, setFetched, setHasMore, setLoading, unsetLoading]);

    useEffect(() => {
        if (Object.keys(nodes).length < CURRENT_PAGE_SIZE) {
            unsetHasMore();
        } else {
            setHasMore();
        }
    }, [indexSearchTerm, nodes, setHasMore, unsetHasMore]);

    useEffect(() => {
        dispatch(setHeaderContent('NodeIndexHeader'));

        return () => {
            dispatch(setHeaderContent(''));
            dispatch(setIndexSearchTerm(undefined));
        };
    }, [dispatch]);

    return (
        <Box
            display="flex"
            height={MOBILE_WO_HEADER_HEIGHT_SX}
            width={1}
        >
            <Box
                width={SIDEBAR_WIDTH}
                display={DISPLAY_MD_SX}
                borderRight={1}
                borderColor="borders.1"
            >
                <RecentNodes />
            </Box>
            <Alert width={MD_WO_SIDEBAR_WIDTH_SX} right={0} />
            {loading && !fetched && <Loader />}

            {!loading && fetched && (
                <VirtualContainer
                    onMore={hasMore ? indexMoreNodes : undefined}
                    width={MD_WO_SIDEBAR_WIDTH_SX}
                    p={1}
                >
                    {
                        Object.keys(nodes).map((id) => (
                            <NodeCard key={id} id={id} />
                        ))
                    }
                </VirtualContainer>
            )}
            <NodeIndexMobileFooter />
        </Box>
    );
}
