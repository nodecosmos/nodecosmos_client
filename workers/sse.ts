// This is ts version of public/worker/sse.js, but it is not used in the project. It is just for reference.
const sw = self as unknown as ServiceWorkerGlobalScope;

// // sse-service-worker.js
import { Comment } from '../src/features/comments/comments.types';
import { ActionTypes, UUID } from '../src/types';

export const CHANNEL_NAME = 'sse_channel';

sw.addEventListener('install', () => {
    sw.skipWaiting().catch((error) => {
        console.error('Service worker installation failed:', error);
    });
});

sw.addEventListener('activate', (event) => {
    event.waitUntil(sw.clients.claim());
});

const channel = new BroadcastChannel(CHANNEL_NAME);

interface EventSourceWrapper {
    eventSource: EventSource;
    userId: UUID;
}

const eventSourceByURL = new Map<string, EventSourceWrapper>();
const activeClientsByURL = new Map<string, number>();

sw.addEventListener('notificationclick', function(event) {
    const { url } = event.notification.data;
    event.notification.close();

    const parsedUrl = new URL(url);
    const clientOrigin = import.meta.env.VITE_REACT_APP_URL;

    // security check
    if (parsedUrl.origin === clientOrigin) {
        event.waitUntil(
            sw.clients.matchAll({ type: 'window' }).then(function(windowClients) {
                for (let i = 0; i < windowClients.length; i += 1) {
                    const client = windowClients[i];
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                return sw.clients.openWindow(url);
            }),
        );
    }
});

function initializeSSE(url: string, userId: UUID = '') {
    const eventSource = eventSourceByURL.get(url);

    if (!eventSource) {
        if (eventSourceByURL.size >= 4) {
            console.error('Too many EventSources open');
            return;
        }

        const eventSource = new EventSource(url, { withCredentials: true });
        const wrapper = {
            eventSource,
            userId,
        };
        eventSourceByURL.set(url, wrapper);

        eventSource.addEventListener(ActionTypes.CreateComment, (event) => {
            const data: Comment = JSON.parse(event.data);

            channel.postMessage({
                action: ActionTypes.CreateComment,
                payload: data,
            });

            // push notification
            if (Notification.permission === 'granted' && data.author.id !== userId) {
                sw.registration.showNotification(
                    `${data.author.name} added a comment`, {
                        icon: 'https://nodecosmos.com/logo-square.png',
                        data: { url: data.url },
                    },
                ).catch((error) => {
                    console.error('Notification error:', error);
                });
            }
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
    userId: UUID;
}

export enum InitActions {
    Initialize = 'INITIALIZE',
}

// Listening for messages to start SSE
sw.addEventListener('message', (event) => {
    const data: InitMessage = event.data;

    switch (data.action) {
    case InitActions.Initialize:
        initializeSSE(data.url, data.userId);
        break;
    }
});
