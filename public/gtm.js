
window.dataLayer = window.dataLayer || [];
function gtag() {window.dataLayer.push(arguments);}

// Set default consent to 'denied' as a placeholder
// Determine actual values based on your own requirements
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
});

(function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
    });
    const f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-5JZ3B94Q');

document.addEventListener('DOMContentLoaded', function() {
    const consentBanner = document.getElementById('cookie-consent-banner');
    const preferencesModal = document.getElementById('cookie-preferences-modal');
    const acceptAllBtn = document.getElementById('accept-all');
    const managePreferencesBtn = document.getElementById('manage-preferences');
    const closePreferencesBtn = document.getElementById('close-preferences');
    const preferencesForm = document.getElementById('preferences-form');

    // Utility Functions to Check Storage Availability
    function isCookieEnabled() {
        try {
            document.cookie = 'test_cookie=1; SameSite=Lax';
            const ret = document.cookie.indexOf('test_cookie=') !== -1;
            document.cookie = 'test_cookie=1; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
            return ret;
        } catch (_) {
            return false;
        }
    }

    function isLocalStorageEnabled() {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Utility Functions to Get and Set Consent
    function setConsentStorage(consentState) {
        if (isCookieEnabled()) {
            setCookie('cookie_consent', JSON.stringify(consentState), 365);
        } else if (isLocalStorageEnabled()) {
            localStorage.setItem('cookie_consent', JSON.stringify(consentState));
        } else {
            // If both are unavailable, you might choose to handle accordingly
            console.warn('Both cookies and LocalStorage are disabled. Consent preferences cannot be stored.');
        }
    }

    function getConsentStorage() {
        let consent = null;
        if (isCookieEnabled()) {
            consent = getCookie('cookie_consent');
        }
        if (!consent && isLocalStorageEnabled()) {
            consent = localStorage.getItem('cookie_consent');
        }
        return consent ? JSON.parse(consent) : null;
    }

    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Show Consent Banner if no consent preference is found
    const consent = getConsentStorage();
    if (!consent) {
        consentBanner.style.display = 'flex';
    } else {
        applyConsent(consent);
    }

    // Event Listener for "Accept All" Button
    acceptAllBtn.addEventListener('click', function() {
        const consentState = {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted',
        };
        setConsentStorage(consentState);
        consentBanner.style.display = 'none';
        applyConsent(consentState);
    });

    // Event Listener for "Manage Preferences" Button
    managePreferencesBtn.addEventListener('click', function() {
        preferencesModal.hidden = false;
        preferencesModal.style.display = 'flex';
        consentBanner.setAttribute('aria-hidden', 'true');
    });

    // Event Listener for "Close" Button in Preferences Modal
    closePreferencesBtn.addEventListener('click', function() {
        preferencesModal.hidden = true;
        preferencesModal.style.display = 'none';
        consentBanner.setAttribute('aria-hidden', 'false');
    });

    // Event Listener for Preferences Form Submission
    preferencesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(preferencesForm);
        const consentState = {
            'ad_storage': formData.get('ad_storage') === 'on' ? 'granted' : 'denied',
            'ad_user_data': formData.get('ad_storage') === 'on' ? 'granted' : 'denied',
            'ad_personalization': formData.get('ad_storage') === 'on' ? 'granted' : 'denied',
            'analytics_storage': formData.get('analytics_storage') === 'on' ? 'granted' : 'denied',
        };
        setConsentStorage(consentState);
        preferencesModal.hidden = true;
        consentBanner.style.display = 'none';
        preferencesModal.style.display = 'none';
        applyConsent(consentState);
    });

    // Function to Apply Stored Consent Preferences
    function applyConsent(consentState) {
        gtag('consent', 'update', consentState);
        if (consentState.analytics_storage === 'granted') {
            gtag('config', 'GTM-5JZ3B94Q', { 'send_page_view': true });
        }
    }
});
