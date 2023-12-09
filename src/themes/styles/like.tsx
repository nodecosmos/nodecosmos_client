import { NodecosmosTheme } from '../type';

export default (theme: NodecosmosTheme) => ({
    '.Like': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '.Heart': { svg: { color: theme.palette.toolbar.red } },
        '.MuiTypography-caption': { lineHeight: 1 },
        '&.liked, &:hover': { '.MuiTypography-caption': { color: theme.palette.toolbar.red } },
    },
});
