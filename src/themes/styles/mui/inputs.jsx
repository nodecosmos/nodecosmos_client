export default (currentTheme) => ({
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        caretColor: currentTheme.palette.primary.main,
        fontFamily: "'Roboto mono', sans-serif",
      },
      root: {
        borderRadius: 4,
        background: currentTheme.palette.background.root,
        '.MuiOutlinedInput-input': {
          padding: '28px 14px 14px',
          '&.MuiInputBase-inputMultiline': {
            padding: 0,
            marginTop: 12,
          },
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
          borderWidth: 2,
          '& legend': {
            display: 'none',
          },
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.palette.error.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderStyle: 'solid',
          background: 'none',
          borderColor: 'transparent',
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
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 500,
        background: 'none',
        backgroundColor: 'none',
        color: currentTheme.palette.text.primary,
        height: '100%',
        position: 'absolute',
        transform: 'none',
        marginLeft: 14,
        marginTop: 24,
        '&.MuiInputLabel-shrink': {
          marginTop: 8,
          transform: 'scale(0.8)',
          color: currentTheme.palette.primary.main,
        },
      },
    },
  },

  //--------------------------------------------------------------------------------------------------------------------
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: 'rgb(69 96 89 / 69%)',
        },
      },
    },
  },
});
