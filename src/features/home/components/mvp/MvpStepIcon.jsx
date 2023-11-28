import Check from '@mui/icons-material/Check';
import { styled, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

export default function MvpStepIcon(props) {
    const { active, completed } = props;
    const theme = useTheme();

    const QontoStepIconRoot = styled('div')(({ ownerState }) => ({
        color: theme.palette.text.primary,
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && { color: theme.palette.primary.main }),
        '& .QontoStepIcon-completedIcon': {
            color: theme.palette.primary.main,
            zIndex: 1,
            fontSize: 24,
        },
        '& .QontoStepIcon-circle': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }));

    return (
        <QontoStepIconRoot ownerState={{ active }}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

MvpStepIcon.propTypes = {
    active: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
};
