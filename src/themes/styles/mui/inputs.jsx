export default (currentTheme) => ({
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        ':-webkit-autofill': {
          '&, &:hover, &:focus': {
            borderRadius: 0,
            boxShadow: `0 0 0px 1000px ${currentTheme.palette.background[6]} inset`,
            WebkitTextFillColor: currentTheme.palette.text.primary,
          },
        },
        caretColor: currentTheme.palette.primary.main,
        fontSize: '1rem',
      },
      root: {
        borderRadius: 4,
        background: currentTheme.palette.background[6],
        '.MuiOutlinedInput-input': {
          '&.MuiInputBase-inputMultiline': {
            padding: 0,
            marginTop: 12,
          },
        },
        '.MuiOutlinedInput-notchedOutline': {
          top: 0,
          borderColor: currentTheme.palette.borders[3],
          borderWidth: 1,
          '& legend': {
            display: 'none',
          },
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.palette.borders[4],
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.palette.error.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
          borderStyle: 'solid',
          background: 'none',
          borderColor: currentTheme.palette.borders[5],
        },
      },
    },
  },

  //--------------------------------------------------------------------------------------------------------------------
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
        color: currentTheme.palette.text.tertiary,
        height: '100%',
        position: 'absolute',
        transform: 'none',
        marginLeft: 14,
        marginTop: 22,
        '&.MuiInputLabel-shrink': {
          marginTop: 8,
          transform: 'scale(0.8)',
          color: currentTheme.palette.text.tertiary,
        },
      },
    },
  },

  //--------------------------------------------------------------------------------------------------------------------
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: currentTheme.palette.background[6],
        },
      },
    },
  },
});
