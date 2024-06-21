import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBreadcrumbs: {
        styleOverrides: {
            root: {
                width: 'max-content',
                '.BreadcrumbItem': {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: 4,
                    marginLeft: 8,
                    fontWeight: 500,
                    fontSize: 14,
                    color: theme.palette.text.tertiary,
                },
                '.MuiLink-root': {
                    cursor: 'pointer',
                },
                '.MuiBreadcrumbs-separator': {
                    color: theme.palette.toolbar.default,
                    fontSize: 10,
                    mx: 0.5,
                },
                '.MuiButtonBase-root': {
                    backgroundColor: 'transparent',
                },
                'button, button:hover': { backgroundColor: theme.palette.toolbar.active },
                '.ScrollButton': {
                    color: theme.palette.background[8],
                    '&:hover': {
                        color: 'inherit',
                    },
                },
                '.tools': {
                    background: 'transparent',
                    fontSize: '0.6rem',
                    ml: 1,
                },

            },
        },
    },
});
