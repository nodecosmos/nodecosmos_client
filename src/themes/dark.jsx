import { createMuiTheme } from '@material-ui/core/styles';

const blue = '#18cbea';
// const lightBlue = '#18cbeac4';

const red = '#e91e63';

const textPrimary = '#ffffff';
const textSecondary = '#e5e5e5';

const defaultBackground = '#2f3136';
const paperBackground = '#36393f';
const fieldBackground = '#3a3e46';
const fieldBorderColor = '#91a7d426';

// const yellow = '#a7b849';
// const transparentYellow = '#bbbb610f';

// const greenishYellow = '#9fd642';

const purplishBlue = '#49b0f4';
// const purple = '#91a7d4';

const theme = createMuiTheme({
  spacing: [0, 1, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowX: 'hidden',
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        margin: '24px 14px 18px 14px',
        padding: 0,
        caretColor: blue,
      },
      root: {
        borderRadius: 4,
        background: fieldBackground,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: fieldBorderColor,
          // background: transparentYellow,
          // borderWidth: 1,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
          borderStyle: 'solid',
          background: 'none',
          borderColor: purplishBlue,
        },
      },
      notchedOutline: {
        borderWidth: 1,
        borderColor: fieldBorderColor,
        transition: 'border-color cubic-bezier(0.0, 0, 0.2, 1) 350ms, '
          + 'background-color 100ms cubic-bezier(0.0, 0, 0.2, 1)',
        '& span': {
          display: 'none',
        },
      },
    },
    MuiInputLabel: {
      animated: {
        transition: 'color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      },
      outlined: {
        color: '#8e9297',
        '&.MuiInputLabel-shrink': {
          color: '#8e9297',
          transform: 'translate(14px, 6px) scale(0.8)',
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',

        '&.MicroButton': {
          border: '1px solid transparent',
          borderRadius: 4,
          '&:hover': {
            borderColor: blue,
          },
          '&:focus': {
            borderColor: blue,
            borderStyle: 'dotted',
          },
        },
      },
    },
    MuiPaper: {
      root: {
        padding: 8,
      },
      rounded: {
        borderRadius: 8,
        '&.BorderTopRounded-4': {
          borderRadius: '4px 4px 0px 0px',
        },
        '&.BorderBottomRounded-4': {
          borderRadius: '0px 0px 4px 4px',
        },
        '&.BorderTopRounded-8': {
          borderRadius: '8px 8px 0px 0px',
        },
        '&.BorderBottomRounded-8': {
          borderRadius: '0px 0px 8px 8px',
        },
        '&.BorderTopRounded-6': {
          borderRadius: '6px 6px 0px 0px',
        },
        '&.BorderBottomRounded-6': {
          borderRadius: '0px 0px 6px 6px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: red,
    },
    error: {
      main: red,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    background: {
      paper: paperBackground,
      default: defaultBackground,
    },
  },
});

export default theme;
