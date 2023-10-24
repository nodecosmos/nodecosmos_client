import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    MuiDataGrid: {
        styleOverrides: {
            root: {
                border: 'none',
                borderRadius: 0,
                '& .MuiSvgIcon-root': {
                    borderRadius: 0,
                    color: theme.palette.background[8],
                },
            },
            overlay: {
                backgroundColor: theme.palette.background[3],
            },
            columnHeaders: {
                borderRadius: 0,
                backgroundColor: theme.palette.background[6],
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
                color: theme.palette.text.secondary,
                '&:hover': {
                    backgroundColor: theme.palette.background[5],
                },
            },
            cell: {
                '&:focus': {
                    outline: 'none',
                },
            },
            withBorderColor: {
                borderColor: theme.palette.borders[2],
            },
            columnSeparator: {
                color: theme.palette.borders[2],
            },
            footerContainer: {
                backgroundColor: theme.palette.background[6],
            },
        },
    },
});
