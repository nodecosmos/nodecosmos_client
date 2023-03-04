export default (currentTheme) => ({
  '::-webkit-scrollbar': {
    width: 12,
    height: 12,
    '@media (max-width: 1024px)': {
      width: 5,
      height: 5,
    },
  },
  '::-webkit-scrollbar-thumb': {
    // borderBottomRightRadius: 8,
    // borderTopRightRadius: 8,
    minHeight: 42,
    backgroundColor: currentTheme.palette.background.scrollbarThumb,
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: currentTheme.palette.background[2],
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: currentTheme.palette.background[2],
  },
});
