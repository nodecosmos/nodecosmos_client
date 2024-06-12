export default () => ({
    '.Transformable': {
        overflow: 'auto',
        width: '100%',
        height: '100%',
    },
    '.TransformableContainer': {
        transition: 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        transformOrigin: 'top left',
        width: '100%',
        height: '100%',
    },
    '.TransformableSVG': {
        transformOrigin: 'top left',
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        userSelect: 'none',
        display: 'block',
    },
});
