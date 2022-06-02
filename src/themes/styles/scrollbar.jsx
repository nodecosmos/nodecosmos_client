export default (currentTheme) => ({
  '::-webkit-scrollbar': {
    width: 13,
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: 2,
    backgroundColor: currentTheme.black7,
  },
  '::-webkit-scrollbar-track': {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 2,
    backgroundColor: currentTheme.black1,
  },
});
