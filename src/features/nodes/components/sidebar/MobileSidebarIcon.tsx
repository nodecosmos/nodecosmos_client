import { NodecosmosDispatch } from '../../../../store';
import useIsMobile from '../../../app/hooks/useIsMobile';
import { setSidebarOpen } from '../../nodes.actions';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function MobileSidebarIcon() {
    const isMobile = useIsMobile();
    const dispatch: NodecosmosDispatch = useDispatch();
    const location = useLocation();

    const isNodeShow = useMemo(() => (
        location.pathname.includes('/nodes/')
    ), [location.pathname]);

    const openSidebar = useCallback(() => {
        dispatch(setSidebarOpen(true));
    }, [dispatch]);

    if (!isMobile || !isNodeShow) {
        return null;
    }

    return (
        <IconButton size="large" onClick={openSidebar} className="SidebarMobileButton">
            <MenuIcon fontSize="inherit" sx={{ color: 'background.8' }} />
        </IconButton>
    );
}
