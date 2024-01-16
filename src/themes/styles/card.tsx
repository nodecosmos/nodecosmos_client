export default () => ({
    '.Card': {
        '.CoverHeader': {
            position: 'relative',
            width: '100%',
            // height: 350,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        '.AmbientImage': {
            position: 'absolute',
            width: '100%',
            height: 350,
            filter: 'blur(50px) opacity(0.3)',
        },
        '.CoverImage': {
            position: 'relative',
            width: '100%',
            height: 280,
            borderRadius: 0,
        },

    },
});
