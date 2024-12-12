import { NodecosmosTheme } from '../../themes.types';
import utils from '../utils';

export default (theme: NodecosmosTheme) => ({
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                ':-webkit-autofill': {
                    '&, &:hover, &:focus': {
                        borderRadius: 0,
                        boxShadow: `0 0 0px 1000px ${theme.palette.backgrounds[6]} inset`,
                        WebkitTextFillColor: theme.palette.texts.primary,
                    },
                },
                caretColor: theme.palette.texts.tertiary,
                fontSize: '1rem',
            },
            root: {
                borderRadius: 4,
                background: theme.palette.backgrounds[6],
                '.MuiOutlinedInput-input': {
                    '&.Mui-disabled': {
                        color: theme.palette.texts.secondary,
                        WebkitTextFillColor: theme.palette.texts.secondary,
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
                '.MuiInputAdornment-root': { color: theme.palette.texts.foreground },
            },
        },
    },

    MuiTextField: {
        styleOverrides: {
            root: {
                ...utils(theme),
                '&.SearchInput': {
                    marginLeft: 8,
                    height: 32,
                    svg: { color: theme.palette.toolbar.default },
                    '.MuiInputBase-root': {
                        borderColor: 'transparent',
                        height: 32,
                        borderRadius: 4,
                        paddingLeft: 4,
                    },
                    '.MuiOutlinedInput-notchedOutline': { '&, &:hover, &:focus': {} },
                },

                '&.InputFieldWithLabel': { '.MuiInputBase-input': { padding: '24px 14px 14px' } },
            },
        },
    },

    MuiAutocomplete: {
        styleOverrides: {
            option: {
                padding: 16,

                '&:hover': { backgroundColor: theme.palette.backgrounds.hover },
            },
            popupIndicator: { color: theme.palette.texts.tertiary },
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
                fontWeight: 500,
                background: 'none',
                backgroundColor: 'none',
                color: theme.palette.texts.tertiary,
                height: '100%',
                position: 'absolute',
                transform: 'none',
                marginLeft: 14,
                marginTop: 20,
                '&.MuiInputLabel-shrink': {
                    marginTop: 6,
                    transform: 'scale(0.8)',
                    color: theme.palette.texts.tertiary,
                },
            },
        },
    },

    MuiSwitch: {
        styleOverrides: {
            root: {
                padding: 4,
                marginRight: 8,
                marginLeft: 0,
            },
            switchBase: { color: theme.palette.backgrounds[8] },
            track: {
                borderRadius: 16,
                backgroundColor: theme.palette.backgrounds[1],
                opacity: 1,
            },
        },
    },

    MuiCheckbox: { styleOverrides: { root: { '&:hover': { backgroundColor: theme.palette.backgrounds[6] } } } },

    MuiInputAdornment: { styleOverrides: { root: { marginRight: 0 } } },

    MuiFormGroup: { styleOverrides: { root: { marginTop: 8 } } },

    MuiFormLabel: {
        styleOverrides: {
            root: {
                fontSize: '1rem',
                color: theme.palette.texts.secondary,
                fontWeight: 700,
                '&.Mui-focused': { color: theme.palette.texts.secondary },
            },
        },
    },

    MuiFormControl: { styleOverrides: { root: { overflow: 'hidden' } } },

    MuiFormControlLabel: {
        styleOverrides: {
            root: {
                marginLeft: 0,
                marginRight: 0,
                lineHeight: 1,
            },
            label: {
                fontSize: '0.875rem',
                color: theme.palette.texts.secondary,
            },
        },
    },
});
