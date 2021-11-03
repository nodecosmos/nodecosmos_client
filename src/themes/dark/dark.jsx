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
  // black8,
  // black9,
  gray,
  green,
  yellow,
  // fluorescent,
  // purple,
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
          marginTop: 16,
          marginBottom: 16,
          borderRadius: 8,
          backgroundColor: black7,
        },
        a: {
          color: beige,
          textDecoration: 'none',
        },
        '.BorderedBox': {
          boxShadow: '-3px -3px 2px 0px rgb(0 0 0 / 15%), '
            + '2px 0px 3px 0px rgb(0 0 0 / 35%),'
            + ' 0px 2px 2px 0px rgb(0 0 0 / 25%)',
        },
        '.BoxShadowBottom': {
          boxShadow: '0px 1px 0px 0px #00000030',
        },
        '.BoxShadowRight': {
          boxShadow: '1px 0px 0px 0px #00000030',
          zIndex: 1,
        },
        '.BoxShadowLeft': {
          boxShadow: `-1px 0px 0px 0px ${black}`,
        },
        '.BoxBackground': {
          backgroundColor: black1,
        },
        '.CodeMirror.cm-s-material': {
          borderRadius: 8,
        },
        '.cm-s-material.CodeMirror': {
          backgroundColor: 'transparent',
          color: 'white',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          height: '100%',
          fontSize: 20,
        },
        '.cm-s-material .CodeMirror-gutters': {
          backgroundColor: 'transparent',
        },
        '.CodeMirror-linenumber': {
          color: `${gray}!important`,
          marginTop: 6,
          fontSize: 15,
        },
        // '.CodeMirror-linenumbers': {
        //   boxShadow: '1px 0px 0px 0px #757980',
        // },
        '.cm-s-material .cm-comment': {
          color: '#596072',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          caretColor: yellow,
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
          '&.MicroPlain': {
            borderColor: 'transparent',
            background: 'transparent',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: red,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderStyle: 'solid',
              background: 'none',
              borderColor: 'transparent',
            },
            '& ::placeholder': {
              color: 'white',
            },
            '&.Large': {
              fontSize: 25,
              '.MuiSvgIcon-root': {
                fontSize: 36,
              },
            },
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: dirtyPurple1,
          // backgroundColor: black5,
          // borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: dirtyPurple1,
          // backgroundColor: black5,
          // borderRadius: 8,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: 12,
          borderRadius: 0,
          color: gray, // beige
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
          '&.Mui-selected': {
            color: blue1,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 6,
          borderRadius: 8,
          backgroundColor: blue1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: beige,
          borderRadius: 4,
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
    blue,
    blue1,
    gray,
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
