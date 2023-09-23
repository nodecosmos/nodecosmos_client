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
      '-apple-system',
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
          color: currentTheme.palette.text.contrast,
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
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {

        },
        option: {
          paddingLeft: 24,
          height: 60,
          color: currentTheme.palette.text.secondary,
          fontWeight: 'bold',
          svg: {
            color: currentTheme.palette.tree.hashtag,
          },
          '&:hover, &.Mui-focused': {
            backgroundColor: currentTheme.palette.background[6],
            color: currentTheme.palette.text.link,
            textDecoration: 'underline',
          },
          '.label': {
            marginLeft: 24,
          },
          '&.MuiAutocomplete-option[aria-selected="true"]': {
            backgroundColor: currentTheme.palette.background[6],
            '&:hover, &.Mui-focused': {
              backgroundColor: currentTheme.palette.background[6],
            },
          },
        },
      },
    },

    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          width: 'max-content',
          '.BreadcrumbItem': {
            display: 'flex',
            alignItems: 'center',
          },
          '.MuiLink-root': {
            color: currentTheme.palette.text.tertiary,
            cursor: 'pointer',
            '&:hover': {
              color: currentTheme.palette.text.link,
            },
          },
          '.MuiBreadcrumbs-separator': {
            color: currentTheme.palette.toolbar.default,
            fontSize: '0.75rem',
            mx: 2,
          },
          'button, button:hover': {
            backgroundColor: currentTheme.palette.toolbar.active,
          },
          '.tools': {
            color: currentTheme.palette.toolbar.active,
            background: 'transparent',
            fontSize: '0.6rem',
            ml: 1,
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
