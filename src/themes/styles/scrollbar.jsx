export default (currentTheme) => ({
  '::-webkit-scrollbar': {
    width: 12,
    '@media (max-width: 1024px)': {
      width: 5,
    },
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: 6,
    backgroundColor: currentTheme.black7,
  },
  '::-webkit-scrollbar-track': {
    borderRadius: 6,
    backgroundColor: currentTheme.black1,
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: currentTheme.black1,
  },
});
