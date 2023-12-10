import { useCallback, useState } from 'react';

export default function useModalOpen(): [boolean, () => void, () => void, () => void] {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);
    const toggleModal = useCallback(() => setModalOpen((prev) => !prev), []);

    return [modalOpen, openModal, closeModal, toggleModal];
}
