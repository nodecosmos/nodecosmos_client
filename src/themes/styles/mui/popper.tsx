import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiPopper: {
        styleOverrides: {
            root: {
                '& .MuiSvgIcon-root': {
                    color: theme.palette.background[8],
                },
            },
        },
    },
});
