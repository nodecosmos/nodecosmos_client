import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.uppy-Dashboard-inner': {
        backgroundColor: 'transparent!important',
        border: 'none!important',
        width: '100%!important',
    },
    '.uppy-DashboardContent-panel, .uppy-Dashboard-FileCard, .uppy-StatusBar, .uppy-StatusBar-actions': {
        backgroundColor: 'transparent!important',
        borderTop: 'none!important',
    },
    '.uppy-StatusBar:before': { backgroundColor: 'transparent!important' },
    '.uppy-DashboardContent-bar': {
        backgroundColor: 'transparent!important',
        padding: '0!important',
    },
    '.uppy-Dashboard-AddFiles': { border: 'none!important' },
    '.uppy-Dashboard-AddFiles-title': { color: `${theme.palette.texts.secondary}!important` },
    '.uppy-Dashboard-poweredBy, .uppy-DashboardContent-title': { display: 'none!important' },
    '.uppy-Dashboard-browse': {
        color: `${theme.palette.button.contrastText}!important`,
        padding: '8px!important',
        paddingLeft: '16px!important',
        paddingRight: '16px!important',
        marginLeft: 2,
        fontSize: '1rem',
        border: `1px solid ${theme.palette.borders['4']}!important`,
        borderRadius: '4px!important',
        backgroundColor: `${theme.palette.button.main}!important`,
        '&:hover': { backgroundColor: `${theme.palette.toggle.main}!important` },
    },
    '.uppy-DashboardContent-back, .uppy-DashboardContent-save': {
        marginLeft: '0!important',
        border: 1,
        borderColor: 'borders.4',
        width: '75px',
        color: `${theme.palette.button.contrastText}!important`,
        padding: '10px 16px',
        borderRadius: 1,

    },
    '.cropper-modal': { backgroundColor: '#ffffff5c' },
});
