const sw = self;

// Broadcast channel name
const CHANNEL_NAME = 'sse_channel';

sw.addEventListener('install', () => {
    sw.skipWaiting().catch((error) => {
        console.error('Service worker installation failed:', error);
    });
});

sw.addEventListener('activate', (event) => {
    event.waitUntil(sw.clients.claim());
});

const channel = new BroadcastChannel(CHANNEL_NAME);

const eventSourceByURL = new Map();
const activeClientsByURL = new Map();

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

function initializeSSE(url, userId = '') {
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

        eventSource.addEventListener('CreateComment', (event) => {
            const data = JSON.parse(event.data);

            channel.postMessage({
                action: 'CreateComment',
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
            if (event.data.action === 'CloseSSE') {
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

// Listening for messages to start SSE
sw.addEventListener('message', (event) => {
    const data = event.data;

    if (data.action === 'INITIALIZE') {
        initializeSSE(data.url, data.userId);
    }
});
