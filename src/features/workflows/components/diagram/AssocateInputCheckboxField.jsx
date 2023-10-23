import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FinalFormCheckbox from '../../../../common/components/final-form/FinalFormCheckbox';
import { selectIOAttribute } from '../../../input-outputs/inputOutputs.selectors';

export default function AssociateInputCheckboxField({ inputId }) {
    const title = useSelector(selectIOAttribute(inputId, 'title'));

    return (
        <FinalFormCheckbox name="inputIds" label={title} value={inputId} />
    );
}

AssociateInputCheckboxField.propTypes = {
    inputId: PropTypes.string.isRequired,
};
