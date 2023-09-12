export default {
  shadows: {
    0: 'none',
    1: 0,
    2: '0 0px 6px #00000020',
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,

    left: {
      1: 0,
      2: '0px 0px 6px #00000020',
    },

    right: {
      1: '1px 0px 1px -1px rgba(0,0,0,0.2)',
      2: '2px 0px 1px -1px rgba(0,0,0,0.2)',
    },

    top: {
      1: '0px -3px 3px -2px rgb(0 0 0 / 10%)',
    },

    header: '0px 3px 1px -2px rgb(0 0 0 / 15%), 0px 2px 3px 0px rgb(0 0 0 / 2%), 0px 1px 5px 0px rgb(0 0 0 / 5%)',
    buttons: {
      1: '2px 2px 1px -1px rgba(0,0,0,0.05),1px 1px 1px 0px rgba(0,0,0,0.05),1px 1px 3px 0px rgba(0,0,0,0.10)',
    },
  },

  palette: {
    primary: {
      main: '#37a000',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    secondary: {
      main: '#b293fe',
    },

    error: {
      main: '#f56565',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    success: {
      main: '#66aa55',
      contrastText: '#fff',
    },

    toggle: {
      main: '#fafafa',
      contrastText: '#000',
    },

    button: {
      main: '#e9ecf2',
      contrastText: '#5d6265',
    },

    buttonContrast: {
      main: '#3d4652',
      contrastText: '#fff',
    },

    borders: {
      1: '#dfe3e7',
      2: '#dfe3e7',
      3: '#dfe3e7',
      4: '#a1d0ff',
      5: '#41a6ff',
    },

    background: {
      1: '#ffffff', // f8f9fa
      2: '#f0f2f5',
      3: '#f0f2f5',
      4: '#f8f9fa',
      5: '#ffffff',
      6: '#e9ecf2',
      7: '#ededed',
      8: '#dcdcdc',

      labels: {
        red: '#f56565',
        green: '#48bb78',
        blue: '#4299e1',
        purple: '#805ad5',
      },

      list: {
        default: '#202124', // #595b63
        activeColor: '#0072E5',
      },

      paper: '#ffffff',
      backdrop: 'rgba(0,0,0,0.76)',
    },

    toolbar: {
      red: '#ff7878',
      green: '#61dc7e',
      blue: '#4299e1',
      lightRed: '#ff8686',
      pink: '#d53f8c',
      purple: '#b775ff',
      yellow: '#ffd000',
      hover: '#f3f5f7',
      active: '#f3f5f7',
      default: '#b6b4a2',
      breadcrumbs: '#4a5568',
    },

    tree: {
      default: '#e2e6ed',
      defaultBorder: '#e3e7ea',
      backgrounds: [
        '#ff5866',
        '#bb8aff',
        '#009fff',
        '#00b2d5',
        '#00b26e',
        '#57ad00',
        '#93ad00',
        '#f08d7f',
      ],
      hashtag: '#9AA6ADFF',
      defaultText: 'rgb(67,69,71)',
      selectedText: 'rgb(65,65,65)',
    },

    workflow: {
      default: '#e2e6ed',
      input: '#cdd4ff',
      background: '#2d3139',
      selectedInputColor: '#a1d0ff',
      defaultInputColor: '#cdd4ff',
    },

    markdownContent: {
      canvas: '#f7f7f7',
      border: '#c5cdda',
      background: 'transparent',
    },

    markdownEditor: {
      tagName: '#ff387a',
      string: '#4b4b4b',
      number: '#000',
      attributeName: '#ffea83',
      className: '#daff29',
      operator: '#000',
      bracket: '#000',
      caret: '#000',
      heading: '#008fff',
      emphasis: '#ffea83',
      quote: '#57606e',
      meta: '#ee56a3',
      link: '#83c1ea',
      background: '#f8f9fa',
      foreground: '#4b4b4b',
      selection: 'rgba(0,0,0,0.06)',
      selectionMatch: 'rgba(0,0,0,0.06)',
      lineHighlight: '#e5e7eb',
      gutterBackground: 'transparent',
      gutterForeground: '#636b73',
    },

    logo: {
      blue: '#5ebee3',
      red: '#e91e63',
    },

    text: {
      primary: '#434c53',
      secondary: '#3d4652',
      tertiary: '#6e768b',
      disabled: '#5c616b',
      contrast: '#5e5f5f',
      sectionPrimary: '#acdf83',
      sectionSecondary: '#cdd4eb',
      link: '#3ba0ff',
      gradients: {
        1: {
          xs: 'linear-gradient(90deg, #b87cf9 0%, #ff4f90 55%)',
          sm: 'linear-gradient(90deg, #b87cf9 0%, #ff4f90 75%)',
        },
        2: {
          xs: 'linear-gradient(90deg, #51e0f9 0%, #7e8bff 55%)',
          sm: 'linear-gradient(90deg, #51e0f9 0%, #7e8bff 75%)',
        },
        3: {
          xs: 'linear-gradient(90deg, #b3ff68 0%, #ffe386 55%)',
          sm: 'linear-gradient(90deg, #b3ff68 0%, #ffe386 75%)',
        },
      },
      collaboratePurple: '#c187ff',
      mergeGreen: '#a3ff48',
      foreground: 'rgba(0, 0, 0, 0.7)',
    },
  },
};
