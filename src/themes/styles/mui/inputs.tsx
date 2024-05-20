import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                ':-webkit-autofill': {
                    '&, &:hover, &:focus': {
                        borderRadius: 0,
                        boxShadow: `0 0 0px 1000px ${theme.palette.background[6]} inset`,
                        WebkitTextFillColor: theme.palette.text.primary,
                    },
                },
                caretColor: theme.palette.text.tertiary,
                fontSize: '1rem',
            },
            root: {
                borderRadius: 4,
                background: theme.palette.background[6],
                '.MuiOutlinedInput-input': {
                    '&.Mui-disabled': {
                        color: theme.palette.text.secondary,
                        WebkitTextFillColor: theme.palette.text.secondary,
                    },
                    '&.MuiInputBase-inputMultiline': {
                        padding: 0,
                        marginTop: 12,
                    },
                },
                '.MuiOutlinedInput-notchedOutline': {
                    top: 0,
                    borderColor: theme.palette.borders[3],
                    borderWidth: 1,
                    '& legend': { display: 'none' },
                },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.borders[4] },
                '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.error.main },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    background: 'none',
                    borderColor: theme.palette.borders[5],
                },
            },
        },
    },

    MuiInputLabel: {
        styleOverrides: {
            animated: {
                transition: 'color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, '
          + 'margin-top 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, '
          + 'transform 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            },
            outlined: {
                background: 'none',
                backgroundColor: 'none',
                color: theme.palette.text.tertiary,
                height: '100%',
                position: 'absolute',
                transform: 'none',
                marginLeft: 14,
                marginTop: 22,
                '&.MuiInputLabel-shrink': {
                    marginTop: 8,
                    transform: 'scale(0.8)',
                    color: theme.palette.text.tertiary,
                },
            },
        },
    },

    MuiCheckbox: {
        styleOverrides: {
            root: {
                '&:hover': { backgroundColor: theme.palette.background[6] },
            },
        },
    },

    MuiInputAdornment: { styleOverrides: { root: { marginRight: 0 } } },
});
