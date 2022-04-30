export default (currentTheme) => ({
  '@keyframes dash': {
    to: {
      strokeDashoffset: 0,
    },
  },

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
