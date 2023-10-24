import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    MuiList: {
        styleOverrides: {
            root: {
                '& .MuiSvgIcon-root': {
                    color: theme.palette.background[8],
                },
            },
        },
    },
    MuiListItem: {
        styleOverrides: {
            root: {
                padding: 0,
                ':not(:first-of-type)': {
                    marginTop: 6,
                },
                '.MuiListItemButton-root': {
                    transition: 'all 150ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
                    borderRadius: 4,
                    padding: '12px 16px',
                    color: theme.palette.background.list.defaultColor,
                    '.MuiTypography-root': {
                        fontWeight: 500,
                    },
                },
                '&:hover': {
                    '.MuiListItemButton-root': {
                        // backgroundColor: theme.palette.background[2],
                    },
                },
                '.active': {
                    color: theme.palette.background.list.activeColor,
                    '&.MuiListItemButton-root': {
                        backgroundColor: theme.palette.background[6],
                    },
                },
            },
        },
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                fontSize: 18,
                width: 18,
                height: 18,
                marginRight: 16,
                minWidth: 0,
                color: theme.palette.background.list.defaultColor,
                '.active &': {
                    color: theme.palette.background.list.activeColor,
                },
            },
        },
    },
});
