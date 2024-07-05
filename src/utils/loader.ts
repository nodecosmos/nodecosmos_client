/**
 * Executes an asynchronous action with conditional loading indicator.
 * If the action takes longer than `delayToShowLoader` milliseconds, a loading indicator is shown.
 *
 * @param action - The asynchronous function to execute.
 * @param params - Parameters to pass to the action.
 * @param setLoading - Function to call to show the loading indicator.
 * @param unsetLoading - Function to call to hide the loading indicator.
 * @param delayToShowLoader - Delay in milliseconds before showing the loader.
 * @param minimumLoaderDisplayTime - Minimum time in milliseconds to show the loader.
 */
async function executeWithConditionalLoader<T, U extends []>(
    action: (...args: U) => Promise<T>,
    params: U,
    setLoading: () => void,
    unsetLoading: () => void,
    delayToShowLoader: number = 100,
    minimumLoaderDisplayTime: number = 150,
): Promise<T> {
    let loaderVisible = false;
    let result: T;

    // Set a timeout to show the loading indicator if the action takes too long
    const loaderTimeout = setTimeout(() => {
        setLoading();
        loaderVisible = true;
    }, delayToShowLoader);

    try {
        result = await action(...params);
    } finally {
        // Clear the timeout if the action finishes before the delay
        clearTimeout(loaderTimeout);

        if (loaderVisible) {
            // If the loader is visible, ensure it stays visible for a minimum time
            const timeVisible = Date.now() - (delayToShowLoader + loaderTimeout);
            if (timeVisible < minimumLoaderDisplayTime) {
                // If the loader has not been visible for long enough, keep it for a bit longer
                setTimeout(unsetLoading, minimumLoaderDisplayTime - timeVisible);
            } else {
                // If it has been visible for the minimum time, hide it immediately
                unsetLoading();
            }
        }
    }

    return result;
}
