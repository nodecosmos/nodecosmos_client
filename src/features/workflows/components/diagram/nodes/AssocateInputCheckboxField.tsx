import React from 'react';
import { useSelector } from 'react-redux';
import { selectIOAttribute } from '../../../../input-outputs/inputOutputs.selectors';
import { UUID } from '../../../../../types';
import FinalFormCheckboxButton from '../../../../../common/components/final-form/FInalFormCheckboxButton';

interface Props {
    inputId: UUID;
}

export default function AssociateInputCheckboxField({ inputId }: Props) {
    const title = useSelector(selectIOAttribute(inputId, 'title'));

    return (
        <FinalFormCheckboxButton name="inputIds" label={title} value={inputId} />
    );
}
