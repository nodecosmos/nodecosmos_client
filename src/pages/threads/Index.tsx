import ThreadsIndexToolbar from '../../features/comments/components/thread/ThreadIndexToolbar';
import { useThreadsContextCreator } from '../../features/comments/hooks/thread/useThreadsContext';
import React from 'react';

export default function ThreadsIndex() {
    const {
        ThreadsContext,
        ctxValue,
    } = useThreadsContextCreator();

    return (
        <ThreadsContext.Provider value={ctxValue}>
            <ThreadsIndexToolbar />
            ThreadsIndex
        </ThreadsContext.Provider>
    );
}
