import EditTitleField from '../../../../../../common/components/EditTItleField';
import useFlowActions from '../../../../../flows/hooks/useFlowActions';
import useFlowContext from '../../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { Typography } from '@mui/material';
import React from 'react';

const SX = {
    minWidth: 'fit-content(14px)',
    maxWidth: 220,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap', // otherwise safari will break words into multiple lines
    '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
        color: 'texts.link',
    },
};

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
            className="text-ellipsis overflow-hidden bold"
            title={title}
            color="texts.primary"
            pr={1}
            variant="body2"
            onChange={handleTitleChange}
            onClose={closeTitleEdit}
            defaultEditing
        />;
    }

    return (
        <Typography
            className="FlowToolbarClick"
            onClick={handleFlowClick}
            variant="body2"
            fontWeight={600}
            color={isFlowDelConflict ? 'toolbar.lightRed' : 'texts.primary'}
            sx={SX}
        >
            {title}
        </Typography>
    );
}
