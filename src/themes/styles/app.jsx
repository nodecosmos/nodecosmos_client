export default (currentTheme) => ({
  a: {
    color: currentTheme.beige1,
    textDecoration: 'none',
  },
  // DropShadow causes bad performance on mobile
  '.DropShadow': { filter: currentTheme.filter1 },
});
