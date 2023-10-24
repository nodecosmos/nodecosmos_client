import { NodecosmosTheme } from '../../type';

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
