import { createTheme } from '@mui/material/styles';
import {
  blue,
  blue1,
  dirtyPurple1,
  red,
  beige,
  beige1,
  black,
  black1,
  black2,
  black3,
  black4,
  black5,
  black6,
  black7,
  black8,
  black9,
  gray,
  green,
} from './colors';

const theme = createTheme({
  spacing: [0, 1, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: 8,
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          backgroundColor: black6,
          width: 24,
        },
        '::-webkit-scrollbar-track': {
          marginTop: 32,
          marginBottom: 16,
          borderRadius: 8,
          backgroundColor: black7,
        },
        a: {
          color: beige,
          textDecoration: 'none',
        },
        '.BorderedBox': {
          border: '1px solid',
          borderColor: black8,
        },
        '.BoxShadowBottom': {
          boxShadow: `0px 1px 0px 0px ${black9}`,
        },
        '.BoxShadowRight': {
          boxShadow: `1px 0px 0px 0px ${black9}`,
          zIndex: 1,
        },
        '.BoxShadowLeft': {
          boxShadow: `-1px 0px 0px 0px ${black9}`,
        },
        '.BoxBackground': {
          backgroundColor: black1,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          caretColor: 'gray',
          fontWeight: 'bold',
        },
        root: {
          borderRadius: 4,
          background: black2,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: black3,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: red,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderStyle: 'solid',
            background: 'none',
            borderColor: blue1,
          },
        },
        notchedOutline: {
          borderWidth: 1,
          borderColor: black3,
          top: 0,
          transition: 'border-color cubic-bezier(0.0, 0, 0.2, 1) 350ms, '
            + 'background-color 100ms cubic-bezier(0.0, 0, 0.2, 1)',
          '& legend': {
            display: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: 1,
        },
        animated: {
          transition: 'color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        },
        outlined: {
          color: beige,
          transform: 'translate(13.5px, 6px) scale(0.8)',
          '&.MuiInputLabel-shrink': {
            color: beige,
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: dirtyPurple1,
          padding: 6,
          // borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: 12,
          borderRadius: 8,
          color: gray, // beige
          transition: 'all none',
          '.MuiListItemIcon-root': {
            color: gray, // beige
          },

          '&.active': {
            background: black5, // purple,
            color: beige,
            '.MuiListItemIcon-root': {
              color: beige,
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          color: beige,
          '&.MicroButton': {
            border: '1px solid transparent',
            borderRadius: 4,
            '&:hover': {
              background: 'rgb(73 176 244 / 7%)',
              borderColor: blue,
            },
            '&:focus': {
              borderColor: green,
              background: 'rgb(73 176 244 / 7%)',
              borderStyle: 'dotted',
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 8,
          '&.Card': {
            backgroundColor: black4,
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
                       + ' 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          },
        },
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
  },
  palette: {
    green,
    primary: {
      main: blue1,
      light: blue,
    },
    secondary: {
      main: red,
    },
    error: {
      main: red,
    },
    text: {
      primary: beige,
      secondary: beige1,
    },
    background: {
      paper: black1,
      default: black,
    },
  },
});

export default theme;
