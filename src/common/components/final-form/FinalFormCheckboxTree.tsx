import useRenderCheckboxTreeItem from '../../hooks/useRenderCheckboxTreeItem';
import React, { useCallback } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';

export interface CheckboxOption {
    value: string;
    label: string;
    children?: CheckboxOption[];
}

export interface FinalFormCheckboxTreeProps {
    options: CheckboxOption[];
    name: string;
    initialNestedLevel: number;
}

export default function FinalFormCheckboxTree(props: FinalFormCheckboxTreeProps) {
    const {
        options, name, initialNestedLevel,
    } = props;
    const renderItem = useRenderCheckboxTreeItem(initialNestedLevel);
    const createRenderFunction = useCallback((option: CheckboxOption) => {
        return (props: FieldRenderProps<string, HTMLElement, string>) => renderItem(props.input, option);
    }, [renderItem]);

    return options && options.map((option) => {
        const renderFunction = createRenderFunction(option);

        return (
            <Field
                key={option.value}
                name={name}
                type="checkbox"
                value={option.value}
                render={renderFunction}
            />
        );
    });
}
