import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';

interface Props {
    title: string;
    noHover?: boolean;
    mt?: number;
    onClick: (value: string) => void;
}

export default function IoListItem({
    mt = 2, title, onClick, noHover = false,
}: Props) {
    const handleClick = useCallback(() => {
        onClick(title);
    }, [onClick, title]);

    return (
        <Box
            component="li"
            display="flex"
            alignItems="center"
            zIndex={1}
            position="relative"
            mt={mt}
            px={1}
            py={2}
            onClick={handleClick}
            sx={{
                cursor: 'pointer',
                borderColor: 'transparent',
                borderRadius: 1,
                '&:hover': {
                    backgroundColor: noHover ? null : 'backgrounds.hover',
                    borderColor: 'borders.4',
                    color: 'backgrounds.hoverColor',
                    svg: { color: 'backgrounds.hoverColor' },
                },
            }}
        >
            <FontAwesomeIcon size="lg" icon={faCodeCommit} />
            <Box ml={2}>
                <Typography variant="body2" fontWeight="bold">
                    {title}
                </Typography>
            </Box>
        </Box>
    );
}
