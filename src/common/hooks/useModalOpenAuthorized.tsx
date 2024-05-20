import useModalOpen from './useModalOpen';
import useAuthorizeNodeAction from '../../features/nodes/hooks/tree/node/useAuthorizeNodeAction';
import { useCallback } from 'react';

export default function useModalOpenAuthorized(): [boolean, () => void, () => void] {
    const [modalOpen, openModal, closeModal] = useModalOpen();
    const authorizeNodeAction = useAuthorizeNodeAction();

    const handleOpenModal = useCallback(() => {
        if (authorizeNodeAction()) {
            openModal();
        }
    }, [authorizeNodeAction, openModal]);

    return [modalOpen, handleOpenModal, closeModal];
}
