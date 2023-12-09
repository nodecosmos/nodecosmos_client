import FinalFormCheckboxButton from '../../../../../common/components/final-form/FInalFormCheckboxButton';
import { UUID } from '../../../../../types';
import { selectIOAttribute } from '../../../../input-outputs/inputOutputs.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    inputId: UUID;
}

export default function AssociateInputCheckboxField({ inputId }: Props) {
    const title = useSelector(selectIOAttribute(inputId, 'title')) as string;

    return (
        <FinalFormCheckboxButton name="inputIds" label={title} value={inputId} />
    );
}
