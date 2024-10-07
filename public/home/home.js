window.addEventListener('load', () => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // @ts-expect-error dataLayer is defined in the GTM script
    window.dataLayer = window.dataLayer || [];

    // eslint-disable-next-line no-inner-declarations
    function gtag(...args) {
        // @ts-expect-error dataLayer is defined in the GTM script
        dataLayer.push(args);
    }

    gtag('js', new Date());

    gtag('config', 'G-185GRBPXWK');
});
