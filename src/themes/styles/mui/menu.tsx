import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    MuiMenuItem: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: theme.palette.background[7],
                },
                '&.Mui-selected': {
                    backgroundColor: theme.palette.background[8],
                    '&:hover': {
                        backgroundColor: theme.palette.background[8],
                    },
                },
            },
        },
    },
});
