import Sidebar from './Sidebar';
import { NodecosmosDispatch } from '../../../../store';
import useIsMobile from '../../../app/hooks/useIsMobile';
import { setSidebarOpen } from '../../nodes.actions';
import { selectSidebarOpen } from '../../nodes.selectors';
import { Drawer } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MobileSidebar() {
    const isMobile = useIsMobile();
    const dispatch: NodecosmosDispatch = useDispatch();
    const open = useSelector(selectSidebarOpen);

    const handleClose = useCallback(() => {
        dispatch(setSidebarOpen(false));
    }, [dispatch]);

    if (!isMobile) {
        return null;
    }

    return (
        <Drawer open={open} onClose={handleClose} anchor="left" elevation={8}>
            <Sidebar handleClose={handleClose} />
        </Drawer>
    );
}
