export default () => ({
  '@keyframes dash': {
    to: {
      strokeDashoffset: 0,
    },
  },
  // ----------------------------------------------------- Tree ----------------------------------------------------- //
  '@keyframes node-button-appear': {
    '0%': {
      transform: 'translate(-30px, -21px)',
    },
    '50%': {
      transform: 'translate(-30px, 0px)',

    },
    '75%': {
      transform: 'translate(-10px, 1px)',

    },
    '100%': {
      transform: 'translate(0px, 0px)',
    },
  },

  '@keyframes node-circle-appear': {
    '0%': {
      transform: 'translateY(-30px)',
    },
    '40%': {
      transform: 'translateY(0)',

    },
    '100%': {
      transform: 'translateY(0)',
    },
  },

  // --------------------------------------------------- Homepage --------------------------------------------------- //
  '@keyframes rotate': {
    from: {
      transform: 'rotate(270deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },

  '@keyframes node-link': {
    from: {
      strokeDashoffset: 1032.3072,
    },
    to: {
      strokeDashoffset: 516.1536,
    },
  },

  '@keyframes node-link-reverse': {
    from: {
      strokeDashoffset: 516.1536,
    },
    to: {
      strokeDashoffset: 1032.3072,
    },
  },

  // Open Source Links Section
  '@keyframes dash-link': {
    to: {
      strokeDashoffset: 914.738098,
    },
  },

  '@keyframes dash-reverse-link': {
    from: {
      strokeDashoffset: 914.738098,
    },
    to: {
      strokeDashoffset: 1372.10715,
    },
  },

  '@keyframes translated-dash-reverse': {
    from: {
      strokeDashoffset: 914.738098,
    },
    to: {
      strokeDashoffset: 457.3690490722656,
    },
  },

  // open source link 1
  '@keyframes dash-link-1': {
    to: {
      strokeDashoffset: 607.842346,
    },
  },

  '@keyframes dash-reverse-link-1': {
    from: {
      strokeDashoffset: 607.842346,
    },
    to: {
      strokeDashoffset: 911.7635190957031,
    },
  },

  // ---------------------------------------------------------------------------------------------------------------- //
  '@keyframes move': {
    from: {
      offsetDistance: '0%',
      offsetRotate: '0deg',
    },

    to: {
      offsetDistance: '100%',
      offsetRotate: '0deg',
    },
  },

  '@keyframes move-reverse': {
    from: {
      offsetDistance: '100%',
      offsetRotate: '0deg',
    },

    to: {
      offsetDistance: '0%',
      offsetRotate: '0deg',
    },
  },
});
