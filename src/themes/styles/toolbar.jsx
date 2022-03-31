export default (currentTheme) => ({
  '.Toolbar': {
    '.Item': {
      width: 26,
      height: 26,
      borderRadius: 8,
      marginLeft: 1,
      marginRight: 1,
      '&:hover': { background: 'rgb(56 195 197 / 14%)' },
    },
    '.Item:nth-of-type(1)': { color: currentTheme.red1 },
    '.Item:nth-of-type(2)': { color: currentTheme.blue1 },
    '.Item:nth-of-type(3)': { color: currentTheme.green2 },
    '.Item:nth-of-type(4)': { color: currentTheme.yellow1 },
    '.Item:nth-of-type(5)': { color: currentTheme.red1 },
    '.Item:nth-of-type(6)': { color: currentTheme.green2 },
    '.MuiSvgIcon-root': { fontSize: 15 },
  },
});
