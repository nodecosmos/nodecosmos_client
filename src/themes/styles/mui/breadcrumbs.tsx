import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBreadcrumbs: {
        styleOverrides: {
            root: {
                width: 'max-content',
                '.BreadcrumbItem': {
                    display: 'flex',
                    alignItems: 'center',
                    padding: 4,
                    borderRadius: 4,
                    marginLeft: 8,
                    fontWeight: 500,
                    fontSize: 14,
                    color: theme.palette.text.tertiary,
                },
                '.BreadcrumbItem:first-of-type': { marginLeft: 0 },
                '.MuiLink-root': { cursor: 'pointer' },
                '.MuiBreadcrumbs-separator': {
                    color: theme.palette.toolbar.default,
                    fontSize: 10,
                    mx: 0.5,
                },
                '.MuiButtonBase-root': { backgroundColor: 'transparent' },
                'button, button:hover': { backgroundColor: theme.palette.toolbar.active },
                '.ScrollButton': {
                    background: 'transparent',
                    svg: { fontSize: '0.6rem' },
                    color: theme.palette.background[8],
                    '&:hover': {
                        background: theme.palette.toolbar.active,
                        color: 'inherit',
                    },
                },

            },
        },
    },
});
