import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiMenuItem: {
        styleOverrides: {
            root: {
                '&:hover': { backgroundColor: theme.palette.backgrounds[7] },
                '&.Mui-selected': {
                    backgroundColor: theme.palette.backgrounds[8],
                    '&:hover': { backgroundColor: theme.palette.backgrounds[8] },
                },
            },
        },
    },
});
