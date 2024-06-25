import IoListItem from './IoListItem';
import { Box, Typography } from '@mui/material';
import { FormApi } from 'final-form';
import React, { useCallback } from 'react';

interface Props {
    titles: string[];
    form: FormApi<{ title: string }>;
    titleFromList: string | null;
    setTitleFromList: (value: string | null) => void;
}

const MAX_HEIGHT = {
    xs: 300,
    sm: 420,
};

export default function IoList(props: Props) {
    const {
        titles,
        form,
        titleFromList,
        setTitleFromList,
    } = props;

    const handleClick = useCallback((value: string) => {
        form.change('title', value);

        setTitleFromList(value);
    }, [form, setTitleFromList]);

    const titlesToDisplay = titleFromList ? [titleFromList] : titles;

    if (!titlesToDisplay.length) {
        return null;
    }

    return (
        <Box mt={2} maxHeight={MAX_HEIGHT} height={1} className="no-io-close overflow-auto">
            <Typography variant="body2" fontWeight="bold" color="text.secondary" className="no-io-close overflow-auto">
                Existing Inputs
            </Typography>
            <Box
                className="overflow-auto"
                component="ul"
                p={1}
                borderRadius={2}
                border={titleFromList ? 2 : 1}
                borderColor={titleFromList ? 'text.link' : 'borders.3'}
                sx={{ backgroundColor: 'background.4' }}>
                {
                    titlesToDisplay.map((title, idx) => (
                        <IoListItem
                            key={title}
                            mt={idx ? 2 : 0}
                            noHover={!!titleFromList}
                            title={title}
                            onClick={handleClick}
                        />
                    ))
                }
            </Box>
        </Box>
    );
}
