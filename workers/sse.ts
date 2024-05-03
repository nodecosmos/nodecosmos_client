// // sse-service-worker.js
import { ActionTypes } from '../src/types';

export const CHANNEL_NAME = 'sse_channel';

self.addEventListener('install', () => {
    // Service worker installation
    // @ts-expect-error - Service worker ignore
    self.skipWaiting(); // Activate worker immediately
});
//
self.addEventListener('activate', (event) => {
    // Service worker activation
    // @ts-expect-error - Service worker ignore
    event.waitUntil(clients.claim()); // Become available to all pages
});

const channel = new BroadcastChannel(CHANNEL_NAME);

let eventSource: EventSource | null = null;

function initializeSSE(url: string) {
    if (!eventSource) {
        console.log('Initializing SSE', url);
        eventSource = new EventSource(url, { withCredentials: true });

        eventSource.addEventListener(ActionTypes.CreateComment, (event) => {
            const data: Comment = JSON.parse(event.data);

            channel.postMessage({
                action: ActionTypes.CreateComment,
                payload: data,
            });
        });

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource?.close();
        };
    }
}

interface InitMessage {
    action: InitActions;
    url: string;
}

export enum InitActions {
    Initialize = 'INITIALIZE',
}

// Listening for messages to start SSE
self.addEventListener('message', (event) => {
    const data: InitMessage = event.data;

    switch (data.action) {
    case InitActions.Initialize:
        initializeSSE(data.url);
        break;
    }
});
