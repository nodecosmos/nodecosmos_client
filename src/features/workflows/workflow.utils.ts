export const getScale = () => {
    const scale = localStorage.getItem('workflowScale');
    if (scale) {
        return parseFloat(scale);
    }
    return 1;
};
