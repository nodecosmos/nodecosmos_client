import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    fontFamily: '-apple-system, system-ui, Roboto, sans-serif',
    h1: {
        fontSize: '35px',
        fontWeight: 500,
    },
    h2: {
        fontSize: '33px',
        fontWeight: 500,
    },
    h3: {
        fontSize: '30px',
        fontWeight: 500,
    },
    h4: {
        fontSize: '27px',
        fontWeight: 500,
    },
    h5: {
        fontSize: '25px',
        fontWeight: 500,
    },
    h6: {
        fontSize: '22px',
        fontWeight: 500,
    },
    body1: {
        fontSize: '1.15rem',
        fontWeight: 300,
        color: theme.palette.texts.contrast,
    },
    body2: { fontSize: '1rem' },
    subtitle1: {
        fontSize: '0.90rem',
        lineHeight: 1.5,
    },
    subtitle2: {
        fontSize: '0.80rem',
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
