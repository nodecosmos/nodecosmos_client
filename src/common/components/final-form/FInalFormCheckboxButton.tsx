import { NodecosmosTheme } from '../../../themes/themes.types';
import { Checkbox, useTheme } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { Field } from 'react-final-form';

interface Props {
    name: string;
    value: string;
    label: string;
}

export default function FinalFormCheckboxButton(props: Props) {
    const {
        name, value, label,
    } = props;
    const theme: NodecosmosTheme = useTheme();
    const checkboxRef = useRef<HTMLInputElement>(null);

    const clickCheckbox = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.target instanceof HTMLInputElement) return;

        if (checkboxRef.current) {
            checkboxRef.current.click();
        }
    }, []);

    return (
        <Field
            name={name}
            type="checkbox"
            value={value}
        >
            {({ input }) => (
                <button
                    type="button"
                    className="WorkflowOutputButton"
                    style={{ backgroundColor: input.checked ? theme.palette.tree.default : 'transparent' }}
                    onClick={clickCheckbox}
                >
                    <Checkbox
                        inputRef={checkboxRef}
                        className="WorkflowOutputCheckbox"
                        checked={input.checked}
                        onChange={input.onChange}
                    />
                    <div className="IoButtonText">
                        {label}
                    </div>
                </button>
            )}
        </Field>
    );
}
