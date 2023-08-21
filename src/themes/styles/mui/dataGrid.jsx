export default (currentTheme) => ({
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: 'none',
        borderRadius: 0,
        '& .MuiSvgIcon-root': {
          borderRadius: 0,
          color: currentTheme.palette.background[8],
        },
      },
      overlay: {
        backgroundColor: currentTheme.palette.background[3],
      },
      columnHeaders: {
        borderRadius: 0,
        backgroundColor: currentTheme.palette.background[6],
      },
      columnHeader: {
        '&:focus': {
          outline: 'none',
        },
      },
      columnHeaderTitle: {
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
      },
      row: {
        color: currentTheme.palette.text.secondary,
      },
      cell: {
        '&:focus': {
          outline: 'none',
        },
      },
      withBorderColor: {
        borderColor: currentTheme.palette.borders[2],
      },
      columnSeparator: {
        color: currentTheme.palette.borders[2],
      },
      footerContainer: {
        backgroundColor: currentTheme.palette.background[6],
      },
    },
  },
});
