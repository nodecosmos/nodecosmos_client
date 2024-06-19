import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.Cover': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: '0px -32px 16px',
        padding: '0px 32px',
        overflow: 'hidden',
        height: 423,
        borderBottom: `1px solid ${theme.palette.borders[1]}`,
        '.CoverImage': {
            padding: 24,
            position: 'relative',
            '.CoverImageMedia': {
                borderRadius: 8,
                maxWidth: '100%',
                width: 850,
                maxHeight: 375,
            },
        },
        '.AmbientImage': {
            position: 'absolute',
            width: '100%',
            height: 375,
            filter: 'blur(50px) opacity(0.4)',
            borderBottom: 1,
        },
        '.CoverImageUploadButton': {
            transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            position: 'absolute',
            backgroundColor: theme.palette.background[1],
            color: theme.palette.text.primary,
            bottom: 32,
            right: 32,
            '&:hover': { backgroundColor: 'background.1' },
        },
        '.DeleteCoverImageButton': {
            zIndex: 1,
            backgroundColor: theme.palette.background[1],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: '50%',
            top: 32,
            right: 32,
            width: 32,
            height: 32,
            padding: 0,
            svg: {
                color: theme.palette.button.contrastText,
                fontSize: 18,
            },
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        },
    },

    '.CoverImageButtonContainer': {
        marginTop: 24,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
});
