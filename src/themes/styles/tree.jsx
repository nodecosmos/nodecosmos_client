export default (currentTheme) => ({
  '.Tree': {
    '.MicronName': { cursor: 'pointer' },
    '.DropShadow': { filter: currentTheme.filter1 },
    '.MicronActions': {
      background: currentTheme.black6,
      boxShadow: currentTheme.boxShadow1,
      border: currentTheme.border1,
      padding: 5,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    '.MuiButton-root': {
      background: '#43464e',
      padding: '2px 6px',
      '&:hover': {
        background: '#43464e',
      },
    },
    '.Path': {
      '&.animated': {
        strokeDasharray: 300,
        strokeDashoffset: 300,
        animation: 'dash 1s linear forwards', // forwards
      },

      '&.animated-reverse': {
        strokeDasharray: 300,
        strokeDashoffset: -300,
        animation: 'dash 1s linear forwards', // forwards
      },
    },
  },
});
