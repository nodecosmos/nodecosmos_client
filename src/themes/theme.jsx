import { createTheme } from '@mui/material/styles';
import scrollbar from './styles/scrollbar';
import animations from './styles/animations';

/* mui */
import input from './styles/mui/inputs';
import buttons from './styles/mui/buttons';
import tab from './styles/mui/tab';
import dataGrid from './styles/mui/dataGrid';

const getTheme = (currentTheme) => createTheme({
  typography: {
    fontFamily: [
      'system-ui',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      letterSpacing: 'normal',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 500,
      // letterSpacing: 'normal',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      // letterSpacing: 'normal',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      // letterSpacing: 'normal',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      // letterSpacing: 'normal',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: 'normal',
    },
    body1: {
      fontSize: '1.15rem',
      fontWeight: 300,
      letterSpacing: 'normal',
      color: currentTheme.palette.text.contrast,
    },
    body2: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.75rem',
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          '&, &.MuiTypography-root': {
            textDecoration: 'none',
          },
        },
        ...scrollbar(currentTheme),
        ...animations(currentTheme),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: currentTheme.palette.background[1],
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: currentTheme.palette.background.backdrop,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
          boxShadow: currentTheme.shadows[1],
          border: `1px solid ${currentTheme.palette.borders[4]}`,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: currentTheme.palette.background[8],
          },
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: currentTheme.palette.background[8],
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: currentTheme.palette.background[7],
          },
          '&.Mui-selected': {
            backgroundColor: currentTheme.palette.background[8],
            '&:hover': {
              backgroundColor: currentTheme.palette.background[8],
            },
          },
        },
      },
    },
    ...input(currentTheme),
    ...buttons(currentTheme),
    ...tab(currentTheme),
    ...dataGrid(currentTheme),
  },
  //-----------------------------------------------------------------------------------------------------------------
  ...currentTheme,
});

export default getTheme;
