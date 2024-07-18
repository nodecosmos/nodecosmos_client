import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.Like': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '.Heart': { svg: { color: theme.palette.toolbar.red } },
        '.MuiTypography-caption': {
            lineHeight: 1,
            color: theme.palette.toolbar.default,
        },
        '&.liked, &:hover': { '.MuiTypography-caption': { color: theme.palette.toolbar.red } },
    },
});
