import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import DefaultButton from './DefaultButton';

export default function DefaultModalFormButton({
    loading, startIcon, title, onSubmit, 
}) {
    return (
        <DefaultButton
            sx={{ mt: 3, float: 'right' }}
            title={title}
            type="submit"
            disabled={loading}
            fontSize="0.875rem"
            onClick={onSubmit}
            startIcon={
                loading
                    ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
                    : <FontAwesomeIcon icon={startIcon} />
            }
        />
    );
}

DefaultModalFormButton.defaultProps = {
    loading: false,
    startIcon: faAdd,
    title: 'Create',
    onSubmit: () => {},
};

DefaultModalFormButton.propTypes = {
    loading: PropTypes.bool,
    startIcon: PropTypes.object,
    title: PropTypes.string,
    onSubmit: PropTypes.func,
};
