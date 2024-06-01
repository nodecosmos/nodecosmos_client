import InviteUserItem from './InviteUserItem';
import { ShowUser } from '../../users/users.types';
import { Box } from '@mui/material';
import { FormApi } from 'final-form';
import React, { useCallback } from 'react';

interface Props {
    form: FormApi<{ usernameOrEmail: string }>;
    users: ShowUser[];
    usernameFromList: string | null;
    setUsernameFromList: (value: string | null) => void;
    setTo: (value: string | null) => void;
}

export default function InviteUsersList(props: Props) {
    const {
        form, users, usernameFromList, setUsernameFromList, setTo,
    } = props;
    const handleClick = useCallback((value: string) => {
        form.change('usernameOrEmail', value);

        setTo(value);
        setUsernameFromList(value);
    }, [form, setTo, setUsernameFromList]);

    let usersToDisplay;

    if (usernameFromList) {
        usersToDisplay = users.filter(user => user.username === usernameFromList);
    } else {
        usersToDisplay = users;
    }

    if (!usersToDisplay.length) {
        return null;
    }

    return (
        <Box
            mt={2}
            p={1}
            borderRadius={2}
            border={usernameFromList ? 2 : 1}
            borderColor={usernameFromList ? 'text.link' : 'borders.3'}
            sx={{ backgroundColor: 'background.4' }}>
            {usersToDisplay.map((user, idx) => {
                return <InviteUserItem
                    noHover={!!usernameFromList}
                    key={user.id}
                    user={user}
                    mt={idx ? 2 : 0}
                    onClick={handleClick} />;
            })}
        </Box>
    );
}
