import { useCallback, useState } from 'react';

export default function useModalOpen(): [boolean, () => void, () => void] {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return [modalOpen, openModal, closeModal];
}
