if (import.meta.env.MODE === 'production') {
    window.dataLayer = window.dataLayer || [];

    // eslint-disable-next-line no-inner-declarations
    function gtag() {
        // eslint-disable-next-line no-undef
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'G-185GRBPXWK');
}
