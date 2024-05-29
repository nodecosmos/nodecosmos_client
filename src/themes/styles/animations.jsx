export default () => ({
    '@keyframes dash': { '100%': { strokeDashoffset: 0 } },
    '@keyframes appear': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },

    '@keyframes node-button-appear': {
        '0%': {
            opacity: 0,
            transform: 'translate(-25px, -15px)',
        },
        '50%': {
            opacity: 1,
            transform: 'translate(-25px, 0px)',
        },
        '100%': {
            opacity: 1,
            transform: 'translate(0px, 0px)',
        },
    },

    '@keyframes workflow-node-button-appear': {
        '0%': {
            opacity: 1,
            transform: 'translate(0, -15px)',
        },

        '100%': {
            opacity: 1,
            transform: 'translate(0px, 0px)',
        },
    },

    '@keyframes node-circle-appear': {
        '0%': {
            opacity: 1,
            transform: 'translateY(-15px)',
        },
        '50%': { transform: 'translateY(0)' },
        '100%': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },

    // Homepage
    '@keyframes rotate': {
        from: { transform: 'rotate(270deg)' },
        to: { transform: 'rotate(360deg)' },
    },

    '@keyframes node-link': {
        from: { strokeDashoffset: 803.917 },
        to: { strokeDashoffset: 401.9585 },
    },

    '@keyframes node-link-reverse': {
        from: { strokeDashoffset: 401.9585 },
        to: { strokeDashoffset: 803.917 },
    },

    // Open Source Links Section
    '@keyframes dash-link': { to: { strokeDashoffset: 914.738098 } },

    '@keyframes dash-reverse-link': {
        from: { strokeDashoffset: 914.738098 },
        to: { strokeDashoffset: 1372.10715 },
    },

    '@keyframes translated-dash-reverse': {
        from: { strokeDashoffset: 914.738098 },
        to: { strokeDashoffset: 457.3690490722656 },
    },

    // open source link 1
    '@keyframes dash-link-1': { to: { strokeDashoffset: 607.842346 } },

    '@keyframes dash-reverse-link-1': {
        from: { strokeDashoffset: 607.842346 },
        to: { strokeDashoffset: 911.7635190957031 },
    },

    '@keyframes move': {
        from: {
            offsetDistance: '0%',
            offsetRotate: '0deg',
        },

        to: {
            offsetDistance: '100%',
            offsetRotate: '0deg',
        },
    },

    '@keyframes move-reverse': {
        from: {
            offsetDistance: '100%',
            offsetRotate: '0deg',
        },

        to: {
            offsetDistance: '0%',
            offsetRotate: '0deg',
        },
    },
});
