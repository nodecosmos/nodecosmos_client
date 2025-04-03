import IoList from './IoList';
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { UUID } from '../../../types';
import { FlowStep, FlowStepPrimaryKey } from '../../flow-steps/flowSteps.types';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import useIoSubmitHandler from '../hooks/useIoSubmitHandler';
import { selectUniqueIoByRootId } from '../inputOutputs.selectors';
import { faCodeFork, faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent, Typography, DialogActions, Button,
    Dialog,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
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
    outputIdsByNodeId: FlowStep['outputIdsByNodeId'];
    flowStepNodeId: UUID;
}

interface StartStepProps {
    flowStepPrimaryKey?: never;
    outputIdsByNodeId?: never;
    flowStepNodeId?: never;
}

type ConditionalProps = FlowStepProps | StartStepProps;

export type CreateIoModalProps = ConditionalProps & {
    open: boolean;
    onClose: () => void;
    associatedObject: IoObjectType;
};

const DIALOG_PAPER_PROPS = {
    elevation: 8,
    m: 0,
    sx: { borderRadius: 2.5 },
    className: 'no-io-close',
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
    const [titleFromList, setTitleFromList] = React.useState<string | null>(null);

    const title = associatedObject === IoObjectType.startStep
        ? 'Create Initial Input' : 'Create Output';

    const submitProps = useMemo(() => ({
        ...props,
        setTitleFromList,
    }), [props, setTitleFromList]);

    const { onSubmit, loading } = useIoSubmitHandler(submitProps);

    let description;

    if (associatedObject === IoObjectType.startStep) {
        description = 'Initial inputs are are the first inputs that are passed into the flows.';
    } else {
        description = `Each node can have multiple outputs. These outputs can be used as inputs for nodes in either
                      the next step or in previous steps as a feedback loop.`;
    }

    const [listTitles, setListTitles] = React.useState<string[]>(uniqueIoTitles.slice(0, 5));

    const handleChangeCb = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitleFromList(null);

        const filteredTitles = uniqueIoTitles.filter((title) => title.toLowerCase().includes(value.toLowerCase()));

        setListTitles(filteredTitles.slice(0, 5));
    }, [uniqueIoTitles]);

    const handleCloseCb = useCallback(() => {
        setTitleFromList(null);
        onClose();
    }, [onClose]);

    return (
        <Dialog
            className="no-io-close"
            fullWidth
            maxWidth="sm"
            onClose={handleCloseCb}
            open={open}
            PaperProps={DIALOG_PAPER_PROPS}>
            <div className="DialogHeader no-io-close">
                <div>
                    <Typography variant="h6" color="texts.primary" align="center" width="auto">
                        <FontAwesomeIcon icon={faCodeFork} />
                        {title}
                    </Typography>
                </div>
                <Typography variant="subtitle1" color="texts.secondary" mt={2} align="center" width={1}>
                    {description}
                </Typography>

                <CloseModalButton onClose={onClose} />
            </div>

            <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                {({
                    handleSubmit,
                    form,
                }) => (
                    <form className="h-100" onSubmit={handleSubmit}>
                        <DialogContent sx={{
                            minHeight: 150,
                            overflow: 'hidden',
                        }}>
                            <Field
                                className="no-io-close"
                                fullWidth
                                name="title"
                                label="Input/Output Title"
                                onChange={handleChangeCb}
                                InputProps={{
                                    autoComplete: 'off',
                                    endAdornment: loading ? <CircularProgress
                                        size={30}
                                        sx={{
                                            color: 'texts.secondary',
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
                                        titleFromList ? <span> new {titleFromList}</span> : null
                                    }
                                </span>
                            </Button>
                        </DialogActions>
                    </form>

                )}
            </Form>

        </Dialog>
    );
}
