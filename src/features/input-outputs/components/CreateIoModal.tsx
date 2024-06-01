import IoList from './IoList';
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import DefaultModal from '../../../common/components/modal/DefaultModal';
import { UUID } from '../../../types';
import { FlowStep, FlowStepPrimaryKey } from '../../flow-steps/flowSteps.types';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import useIoSubmitHandler from '../hooks/useIoSubmitHandler';
import { selectUniqueIoByRootId } from '../inputOutputs.selectors';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent, Typography, Alert as MuiAlert, DialogActions, Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useSelector } from 'react-redux';

export enum IoObjectType {
    startStep = 'startStep',
    flowStep = 'flowStep',
}

// Assuming these interfaces are defined somewhere
interface FlowStepProps {
    flowStepPrimaryKey: FlowStepPrimaryKey;
    outputNodeId: UUID;
    outputIdsByNodeId: FlowStep['outputIdsByNodeId'];
}

interface StartStepProps {
    flowStepPrimaryKey?: never;
    outputNodeId?: never;
    outputIdsByNodeId?: never;
}

type ConditionalProps = FlowStepProps | StartStepProps;

export type CreateIoModalProps = ConditionalProps & {
    open: boolean;
    onClose: () => void;
    associatedObject: IoObjectType;
};

export default function CreateIoModal(props: CreateIoModalProps) {
    const {
        open,
        onClose,
        associatedObject,
    } = props;
    const { rootId, branchId } = useWorkflowContext();
    const allWorkflowIos = useSelector(selectUniqueIoByRootId(branchId, rootId as UUID));
    const allIoTitles = useMemo(() => allWorkflowIos.map((io) => io.title), [allWorkflowIos]);
    const uniqueIoTitles = useMemo(() => Array.from(new Set(allIoTitles)), [allIoTitles]);

    const title = associatedObject === IoObjectType.startStep
        ? 'Create Initial Input' : 'Create Output';

    const { onSubmit, loading } = useIoSubmitHandler(props);

    let description = '';

    if (associatedObject === IoObjectType.startStep) {
        description = `Initial inputs are used to start the workflow. 
                       They are the first inputs that are passed into the workflow.`;
    } else {
        description = `Each node can have multiple outputs. Outputs can be used as inputs for
                       nodes on either next step or previous steps as feedback loop.`;
    }

    const [titleFromList, setTitleFromList] = React.useState<string | null>(null);
    const [listTitles, setListTitles] = React.useState<string[]>(uniqueIoTitles.slice(0, 5));

    const handleChangeCb = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitleFromList(null);

        const filteredTitles = uniqueIoTitles.filter((title) => title.toLowerCase().includes(value.toLowerCase()));

        setListTitles(filteredTitles.slice(0, 5));
    }, [uniqueIoTitles]);

    const handleCloseCb = useCallback(() => {
        onClose();
        setTitleFromList(null);
    }, [onClose]);

    return (
        <DefaultModal open={open} onClose={handleCloseCb}>
            <DialogTitle>
                {title}
                <CloseModalButton onClose={handleCloseCb} />
            </DialogTitle>

            <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                {({ handleSubmit, form }) => (
                    <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                        <DialogContent sx={{ minHeight: 550 }}>

                            <MuiAlert
                                severity="info"
                                variant="outlined"
                                sx={{
                                    borderRadius: 1,
                                    width: 'calc(100% - 1px)',
                                    border: 0,
                                    mb: 2,
                                    backgroundColor: 'background.1',
                                }}
                            >
                                <Typography variant="body2" color="text.info"> {description} </Typography>
                            </MuiAlert>

                            <Field
                                fullWidth
                                name="title"
                                label="Input/Output Title"
                                onChange={handleChangeCb}
                                InputProps={{
                                    autoComplete: 'off',
                                    endAdornment: loading ? <CircularProgress
                                        size={30}
                                        sx={{
                                            color: 'text.secondary',
                                            mr: 2,
                                        }} /> : null,
                                }}
                                required
                            />

                            <IoList
                                titles={listTitles}
                                form={form}
                                titleFromList={titleFromList}
                                setTitleFromList={setTitleFromList}
                            />
                        </DialogContent>
                        <DialogActions sx={{
                            px: 3,
                            pb: 3,
                        }}>
                            <Button
                                type="submit"
                                disableElevation
                                variant="outlined"
                                color="warning"
                                startIcon={
                                    loading
                                        ? <CircularProgress size={20} style={{ color: 'warning.main' }} />
                                        : <FontAwesomeIcon icon={faUserPlus} />
                                }
                                sx={{ height: 'auto' }}
                            >
                                <span className="Text">
                                    Create
                                    {
                                        titleFromList ? <span> new <b>{titleFromList}</b></span> : null
                                    }
                                </span>
                            </Button>
                        </DialogActions>
                    </form>

                )}
            </Form>

        </DefaultModal>
    )
    ;
}
