import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiAutocomplete: {
        styleOverrides: {
            option: {
                paddingLeft: 24,
                height: 60,
                color: theme.palette.text.secondary,
                fontWeight: 'bold',
                svg: { color: theme.palette.tree.hashtag },
                '&:hover, &.Mui-focused': {
                    backgroundColor: theme.palette.background[6],
                    color: theme.palette.text.link,
                    textDecoration: 'underline',
                },
                '.label': { marginLeft: 24 },
                '&.MuiAutocomplete-option[aria-selected="true"]': {
                    backgroundColor: theme.palette.background[6],
                    '&:hover, &.Mui-focused': { backgroundColor: theme.palette.background[6] },
                },
            },
        },
    },
});
