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
const eventSourceByURL = new Map<string, EventSource>();
const activeClientsByURL = new Map<string, number>();

function initializeSSE(url: string) {
    const eventSource = eventSourceByURL.get(url);

    if (!eventSource) {
        const eventSource = new EventSource(url, { withCredentials: true });
        eventSourceByURL.set(url, eventSource);

        eventSource.addEventListener(ActionTypes.CreateComment, (event) => {
            const data: Comment = JSON.parse(event.data);

            channel.postMessage({
                action: ActionTypes.CreateComment,
                payload: data,
            });
        });

        eventSource.onmessage = (event) => {
            console.log('EventSource message:', event);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource?.close();
        };

        channel.onmessage = (event) => {
            if (event.data.action === ActionTypes.CloseSSE) {
                const activeClients = (activeClientsByURL.get(url) ?? 1) - 1;
                activeClientsByURL.set(url, activeClients);

                if (activeClients === 0) {
                    console.log('Closing EventSource:', url);
                    eventSource.close();
                    eventSourceByURL.delete(url);
                }
            }
        };

        activeClientsByURL.set(url, 0);
    }

    activeClientsByURL.set(url, (activeClientsByURL.get(url) ?? 0) + 1);
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
