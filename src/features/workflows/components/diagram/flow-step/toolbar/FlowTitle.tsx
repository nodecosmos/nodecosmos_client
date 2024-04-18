import EditTitleField from '../../../../../../common/components/EditTItleField';
import useFlowActions from '../../../../../flows/hooks/useFlowActions';
import useFlowContext from '../../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { Typography } from '@mui/material';
import React from 'react';

export default function FlowTitle() {
    const {
        id, title, titleEditOpen,
    } = useFlowContext();
    const { isFlowDeletedConflict } = useWorkflowBranch();
    const { handleFlowClick, handleTitleChange } = useFlowActions();
    const { closeTitleEdit } = useFlowActions();
    const isFlowDelConflict = isFlowDeletedConflict(id);

    if (titleEditOpen) {
        return <EditTitleField
            title={title}
            color="text.primary"
            pr={1}
            variant="body2"
            onChange={handleTitleChange}
            onClose={closeTitleEdit}
            defaultEditing
        />;
    }

    return (
        <Typography
            onClick={handleFlowClick}
            variant="body1"
            fontWeight={600}
            color="text.tertiary"
            sx={{
                minWidth: 'fit-content(14px)',
                maxWidth: 220,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', // otherwise safari will break words into multiple lines
                color: isFlowDelConflict ? 'toolbar.lightRed' : 'text.primary',
                '&:hover': {
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'text.link',
                },
            }}
        >
            {title}
        </Typography>
    );
}
