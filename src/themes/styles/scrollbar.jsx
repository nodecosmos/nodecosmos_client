export default (currentTheme) => ({
  '::-webkit-scrollbar': {
    width: 12,
    '@media (max-width: 1024px)': {
      width: 5,
    },
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: 2,
    backgroundColor: currentTheme.palette.background.scrollbarThumb,
  },
  '::-webkit-scrollbar-track': {
    borderRadius: 2,
    backgroundColor: currentTheme.palette.background[1],
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: currentTheme.palette.background[1],
  },
});
