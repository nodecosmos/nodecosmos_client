import Alert from '../../common/components/Alert';
import Loader from '../../common/components/Loader';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import { HEADER_HEIGHT } from '../../features/app/constants';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { selectThreads } from '../../features/comments/comments.selectors';
import { indexThreads } from '../../features/comments/comments.thunks';
import ThreadsIndexToolbar from '../../features/comments/components/thread/ThreadIndexToolbar';
import ThreadList from '../../features/comments/components/thread/ThreadList';
import { useThreadsContextCreator } from '../../features/comments/hooks/thread/useThreadsContext';
import { NodecosmosDispatch } from '../../store';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ThreadsIndex() {
    const {
        ThreadsContext,
        ctxValue,
    } = useThreadsContextCreator();
    const {
        originalId, branchId, nodeId: objectId,
    } = useBranchContext();
    const threads = useSelector(selectThreads(branchId, objectId));
    const dispatch: NodecosmosDispatch = useDispatch();
    const [loading, , unsetLoading] = useBooleanStateValue(!threads?.length);
    useEffect(() => {
        if (loading) {
            dispatch(indexThreads({
                rootId: originalId,
                branchId,
                objectId,
            })).then(() => unsetLoading());
        }
    }, [branchId, dispatch, loading, objectId, originalId, unsetLoading]);

    if (loading) {
        return <Loader />;
    }

    return (
        <ThreadsContext.Provider value={ctxValue}>
            <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                <Alert position="relative" />
                <ThreadsIndexToolbar />
                <ThreadList />
            </Box>
        </ThreadsContext.Provider>
    );
}
