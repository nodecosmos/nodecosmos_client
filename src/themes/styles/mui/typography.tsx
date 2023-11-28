import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    fontFamily: [
        '-apple-system',
        'system-ui',
        'Roboto',
        'sans-serif',
    ].join(','),
    h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
        letterSpacing: 'normal',
    },
    h2: {
        fontSize: '2.25rem',
        fontWeight: 500,
        // letterSpacing: 'normal',
    },
    h3: {
        fontSize: '2rem',
        fontWeight: 500,
        // letterSpacing: 'normal',
    },
    h4: {
        fontSize: '1.75rem',
        fontWeight: 500,
        // letterSpacing: 'normal',
    },
    h5: {
        fontSize: '1.5rem',
        fontWeight: 500,
        // letterSpacing: 'normal',
    },
    h6: {
        fontSize: '1.25rem',
        fontWeight: 500,
        letterSpacing: 'normal',
    },
    body1: {
        fontSize: '1.15rem',
        fontWeight: 300,
        letterSpacing: 'normal',
        color: theme.palette.text.contrast,
    },
    body2: { fontSize: '1rem' },
    subtitle1: { fontSize: '0.75rem' },
    subtitle2: {
        fontSize: '0.75rem',
        fontWeight: 500,
    },
    button: {
        fontSize: '0.875rem',
        fontWeight: 400,
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
    },
    overline: {
        fontSize: '0.75rem',
        fontWeight: 500,
    },

});
