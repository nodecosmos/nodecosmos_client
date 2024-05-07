import DefaultFormButton from '../../../common/components/buttons/DefaultFormButton';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { NodecosmosDispatch } from '../../../store';
import { create, NodeCreationPayload } from '../nodes.thunks';
import { Node } from '../nodes.types';
import { faHashtag } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    InputAdornment,
    DialogContent,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateNodeModal(props: { open: boolean, onClose: () => void }) {
    const { open, onClose } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback(async (formValues: {title: string}) => {
        setLoading(true);

        const payload: NodeCreationPayload = {
            isPublic: true,
            isRoot: true,
            ...formValues,
            orderIndex: 0,
        };

        dispatch(create(payload)).then((response) => {
            const node = response.payload as Node;

            navigate(`/nodes/${node.rootId}/${node.id}`);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }, [dispatch, navigate]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 0,
                sx: { borderRadius: 2.5 },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    border: 1,
                    borderColor: 'borders.4',
                },
            }}
        >
            <DialogTitle>
                New Node
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <FinalFormInputField
                                fullWidth
                                name="title"
                                placeholder="Title"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon icon={faHashtag} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <DefaultFormButton loading={loading} />
                        </form>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
