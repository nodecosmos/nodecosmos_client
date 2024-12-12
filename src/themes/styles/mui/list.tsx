import { NodecosmosTheme } from '../../themes.types';
import utils from '../utils';

export default (theme: NodecosmosTheme) => ({
    MuiList: { styleOverrides: { root: { '& .MuiSvgIcon-root': { color: theme.palette.backgrounds[8] } } } },
    MuiListItem: {
        styleOverrides: {
            root: {
                padding: 0,
                ':not(:first-of-type)': { marginTop: 4 },
                '.MuiListItemButton-root': {
                    transition: 'none',
                    borderRadius: 4,
                    padding: '12px 16px',
                    color: theme.palette.backgrounds.list.defaultColor,
                    '.MuiTypography-root': { fontWeight: 500 },
                    ...utils(theme),
                },
                '&:hover': { '.MuiListItemButton-root': { backgroundColor: theme.palette.backgrounds[6] } },
                '.active': {
                    color: theme.palette.backgrounds.list.activeColor,
                    '&.MuiListItemButton-root': { backgroundColor: theme.palette.backgrounds[6] },
                },
            },
        },
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20,
                width: 25,
                height: 25,
                minWidth: 0,
                color: theme.palette.backgrounds.list.defaultColor,
                '.active &': { color: theme.palette.backgrounds.list.activeColor },
            },
        },
    },
});
