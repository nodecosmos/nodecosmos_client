import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiDataGrid: {
        styleOverrides: {
            root: {
                minHeight: 400,
                border: 'none',
                borderRadius: 0,
                '& .MuiSvgIcon-root': {
                    borderRadius: 0,
                    color: theme.palette.background[8],
                },

                '& .MuiDataGrid-scrollbarFiller': {
                    borderRadius: 0,
                    backgroundColor: theme.palette.background[6],
                },
            },
            filter: {
                borderRadius: 0,
                backgroundColor: theme.palette.background[6],
            },
            virtualScroller: {
                borderTopLeftRadius: '0!important',
                borderTopRightRadius: '0!important',
            },
            columnHeaders: {
                borderRadius: 0,
                backgroundColor: theme.palette.background[6],
            },
            columnHeader: {
                backgroundColor: theme.palette.background[6],
                '&:focus': { outline: 'none' } },
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
                '&:hover': { backgroundColor: theme.palette.background[5] },
            },
            cell: {
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                '&:focus': { outline: 'none' },
            },
            withBorderColor: { borderColor: 'transparent' },
            columnSeparator: { color: theme.palette.borders[2] },
            footerContainer: { backgroundColor: theme.palette.background[6] },
            overlay: { backgroundColor: theme.palette.background[2] },
            'topContainer::after': { backgroundColor: 'none' },
        },
    },
});
