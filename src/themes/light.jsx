export default {
  shadows: {
    0: 'none',
    1: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    2: '0px 3px 6px rgba(0, 0, 0, 0.12)',
    3: '0px 10px 20px rgba(0, 0, 0, 0.12)',
    4: '0px 15px 25px rgba(0, 0, 0, 0.12)',
    5: '0px 20px 40px rgba(0, 0, 0, 0.14)',
    6: '0px 25px 50px rgba(0, 0, 0, 0.14)',
    7: '0px 30px 60px rgba(0, 0, 0, 0.14)',
    8: '0px 35px 70px rgba(0, 0, 0, 0.14)',
    9: '0px 40px 80px rgba(0, 0, 0, 0.14)',
    10: '0px 50px 100px rgba(0, 0, 0, 0.14)',
    11: '0px 60px 120px rgba(0, 0, 0, 0.14)',
    12: '0px 70px 140px rgba(0, 0, 0, 0.14)',
    13: '0px 80px 160px rgba(0, 0, 0, 0.14)',
    14: '0px 90px 180px rgba(0, 0, 0, 0.14)',
    15: '0px 100px 200px rgba(0, 0, 0, 0.14)',
    16: '0px 110px 220px rgba(0, 0, 0, 0.14)',
    17: '0px 120px 240px rgba(0, 0, 0, 0.14)',
    18: '0px 130px 260px rgba(0, 0, 0, 0.14)',
    19: '0px 140px 280px rgba(0, 0, 0, 0.14)',
    20: '0px 150px 300px rgba(0, 0, 0, 0.14)',
    21: '0px 160px 320px rgba(0, 0, 0, 0.14)',
    22: '0px 170px 340px rgba(0, 0, 0, 0.14)',
    23: '0px 180px 360px rgba(0, 0, 0, 0.14)',
    24: '0px 190px 380px rgba(0, 0, 0, 0.14)',

    top: {
      1: '0px -3px 3px -2px rgb(0 0 0 / 10%)',
    },

    header: '0px 3px 1px -2px rgb(0 0 0 / 15%), 0px 2px 3px 0px rgb(0 0 0 / 2%), 0px 1px 5px 0px rgb(0 0 0 / 5%)',
    container: {
      bottom: {
        xs: '0px 3px 1px -2px rgb(237 237 237), 0px 1px 2px 0px rgb(237 237 237)',
        md: '0px 3px 1px -2px rgb(66 66 72 / 25%), 0px 1px 2px 0px rgb(237 237 237)',
      },
      right: {
        xs: '3px 0px 1px -1px rgb(237 237 237), 1px 0px 1px 0px rgb(237 237 237)',
        md: '3px 0px 1px -1px rgb(237 237 237), 1px 0px 1px 0px rgb(237 237 237)',
      },
      top: {
        xs: '0px -3px 1px -2px rgb(237 237 237), 0px -1px 2px 0px rgb(237 237 237)',
        md: '0px -3px 1px -2px rgb(237 237 237), 0px -1px 2px 0px rgb(237 237 237)',
      },
    },
  },

  palette: {
    primary: {
      main: '#b3ff68',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    secondary: {
      main: '#cdd4ff',
    },

    error: {
      main: '#ed4b82',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    success: {
      main: '#b3ff68',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    toggle: {
      main: '#3a3e45',
      contrastText: '#fff',
    },

    borders: {
      1: '#d1d5db',
      2: '#e5e7eb',
      3: '#e5e7eb',

      box: {
        xs: '#f5f5f5',
        md: '#ffffff',
      },
    },

    background: {
      1: '#f5f5f5',
      2: '#f7f7f8',
      3: '#f3f4f6',
      4: '#e5e7eb',
      5: '#f2f5fa',

      labels: {
        red: '#e15e7d',
        green: '#abe15e',
        blue: '#85c7f3',
        purple: '#c187ff',
      },

      list: {
        iconBackground: '#d1d5db',
        iconForeground: '#000',
        active: 'hsl(220deg 10% 96%)',
      },

      scrollbarThumb: '#c7c7c7',
      paper: '#ffffff',
      hover: 'rgba(0, 0, 0, 0.1)',
      contrast: '#333333',
    },

    toolbar: {
      red: '#e91e63',
      green: '#b6fd7b',
      blue: '#2adfff',
    },

    tree: {
      default: '#d1d5db',
      level1: '#e91e63',
      level2: '#a2d85b',
      level3: '#4dcdff',
      defaultText: '#000',
      selectedText: 'rgba(0, 0, 0, 0.9)',
    },

    markdownContent: {
      canvas: '#f2f5fa',
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
      heading: '#80c7ff',
      emphasis: '#ffea83',
      quote: '#57606e',
      meta: '#ff87c4',
      link: '#83c1ea',
      background: '#ffffff',
      foreground: '#4b4b4b',
      selection: 'rgba(0,0,0,0.06)',
      selectionMatch: 'rgba(0,0,0,0.06)',
      lineHighlight: '#e5e7eb',
      gutterBackground: 'transparent',
      gutterForeground: '#636b73',
    },

    logo: {
      blue: '#2adfff',
      red: '#e91e63',
    },

    text: {
      primary: '#626e79',
      secondary: '#9a9da9',
      tertiary: '#f5f5f2',
      contrast: '#000',
      sectionPrimary: '#acdf83',
      sectionSecondary: '#cdd4eb',
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
