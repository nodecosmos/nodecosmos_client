export default (currentTheme) => ({
  '::-webkit-scrollbar': {
    width: 9,
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    backgroundColor: currentTheme.black3,
    width: 24,
  },
  '::-webkit-scrollbar-track': {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
});
