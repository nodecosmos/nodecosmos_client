import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiDataGrid: {
        styleOverrides: {
            root: {
                contain: 'strict',
                minHeight: 400,
                height: '100%',
                border: 'none',
                borderRadius: 0,
                '& .MuiSvgIcon-root': {
                    borderRadius: 0,
                    color: theme.palette.backgrounds[8],
                },

                '.MuiDataGrid-filler': {
                    borderRadius: 0,
                    backgroundColor: theme.palette.backgrounds[2],
                },

                '& .MuiDataGrid-scrollbarFiller': {
                    borderRadius: 0,
                    backgroundColor: theme.palette.backgrounds[6],
                },
            },
            virtualScroller: {
                borderTopLeftRadius: '0!important',
                borderTopRightRadius: '0!important',
            },
            columnHeaders: {
                borderRadius: 0,
                backgroundColor: theme.palette.backgrounds[6],
            },
            columnHeader: {
                backgroundColor: theme.palette.backgrounds[6],
                '&:focus': { outline: 'none' },
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
                color: theme.palette.texts.secondary,
                '&:hover': { backgroundColor: theme.palette.backgrounds[4] },
            },
            cell: {
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                '&:focus': { outline: 'none' },
            },
            withBorderColor: { borderColor: 'transparent' },
            columnSeparator: { color: theme.palette.borders[2] },
            footerContainer: { backgroundColor: theme.palette.backgrounds[6] },
            overlay: { backgroundColor: theme.palette.backgrounds[2] },
            'topContainer::after': { backgroundColor: 'none' },
        },
    },
});
