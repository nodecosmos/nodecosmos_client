import { NodecosmosTheme } from '../../themes/type';
import { CheckboxOption } from '../components/final-form/FinalFormCheckboxTree';
import {
    Box, Checkbox, FormControlLabel, useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';
import { FieldInputProps } from 'react-final-form';

export default function useRenderCheckboxTreeItem(initialNestedLevel = 1) {
    const theme: NodecosmosTheme = useTheme();

    const nodeBackgroundColors = theme.palette.tree.backgrounds;
    const bgCount = nodeBackgroundColors.length;

    const renderOption = useCallback((
        input: FieldInputProps<string>,
        option: CheckboxOption, nestedLevel = initialNestedLevel,
    ) => {
        return (
            <Box>
                <Box display="flex" alignItems="center">
                    {
                        (nestedLevel > 1)
                        && (
                            <Box
                                ml={-4}
                                height="0px"
                                width="50px"
                                borderTop="1px dashed"
                                borderColor="borders.5"
                            />
                        )
                    }
                    <FormControlLabel
                        sx={{
                            borderColor: nodeBackgroundColors[nestedLevel % bgCount],
                            borderRadius: 1,
                        }}
                        componentsProps={{
                            typography: {
                                whiteSpace: 'nowrap',
                                ml: 1,
                                color: 'text.secondary',
                                sx: {
                                    '&:hover': {
                                        color: 'text.link',
                                        textDecoration: 'underline',
                                    },
                                },
                            },
                        }}
                        label={option.label}
                        control={(
                            <Checkbox
                                checked={input.checked}
                                value={option.value}
                                onChange={input.onChange}
                                name={input.name}
                                sx={{ color: nodeBackgroundColors[nestedLevel % bgCount] }}
                            />
                        )}
                    />
                </Box>
                <Box
                    sx={{
                        borderLeft: '1px dashed',
                        borderColor: 'borders.5',
                    }}
                    ml={nestedLevel > 1 ? 3.5 : 1}
                    pl={4}
                >
                    {
                        option.children
                            ? option.children.map((child: CheckboxOption) => {
                                return renderOption(input, child, nestedLevel + 1);
                            })
                            : null
                    }
                </Box>
            </Box>
        );
    }, [nodeBackgroundColors, bgCount, initialNestedLevel]);

    return renderOption;
}
