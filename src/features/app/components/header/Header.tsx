/* mui */
import UserHeaderTools from './UserHeaderTools';
import ThreadShowHeader from '../../../comments/components/thread/ThreadShowHeader';
import ContributionRequestShowHeader from '../../../contribution-requests/components/ContributionRequestShowHeader';
import NodeIndexHeader from '../../../nodes/components/header/NodeIndexHeader';
import MobileSidebarIcon from '../../../nodes/components/sidebar/MobileSidebarIcon';
import TreeShowHeader from '../../../nodes/components/tree/TreeShowHeader';
import { selectHeaderContent } from '../../app.selectors';
import {
    HEADER_HEIGHT, MD_WO_SIDEBAR_WIDTH_SX, SIDEBAR_MD_SX,
} from '../../constants';
import useIsMobile from '../../hooks/useIsMobile';
import {
    Box, Button, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

/* nodecosmos */
const NON_HEADER_PATHS = ['/auth/login', '/auth/signup'];
const NON_SIDEBAR_PATHS = ['/auth/login', '/auth/signup', '/reset_password', '/404'];
const HEADER_CONTENT = {
    NodeIndexHeader: <NodeIndexHeader />,
    TreeShowHeader: <TreeShowHeader />,
    ContributionRequestShowHeader: <ContributionRequestShowHeader />,
    ThreadShowHeader: <ThreadShowHeader />,
};
export default function Header() {
    const location = useLocation();
    const headerContent = useSelector(selectHeaderContent);
    const isMobile = useIsMobile();
    const hasSidebar = useMemo(() => (
        !isMobile || NON_SIDEBAR_PATHS.some((path) => location.pathname.startsWith(path))
    ), [isMobile, location.pathname]);

    if (NON_HEADER_PATHS.includes(location.pathname)) return null;

    return (
        <Box height={HEADER_HEIGHT} width={1} position="relative" zIndex={4}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                height={1}
                width={1}
            >
                <Box
                    component="div"
                    width={SIDEBAR_MD_SX}
                    height={1}
                    display="flex"
                    alignItems="center"
                    borderRight={hasSidebar ? 1 : 0}
                    borderBottom={hasSidebar ? 0 : 1}
                    borderColor="borders.1"
                >
                    <MobileSidebarIcon />
                    <Button
                        component={Link}
                        to="/"
                        className="LogoButton"
                    >
                        <img src="/logo.svg" alt="logo" height={30} width={30} />
                        <Typography fontWeight="bold" className="min-vis-width-viewport-360">
                            <Box component="span" color="logo.blue">node</Box>
                            <Box component="span" color="logo.red">cosmos</Box>
                        </Typography>
                        <Typography
                            className="min-vis-width-viewport-400"
                            fontWeight="bold"
                            variant="subtitle2"
                            color="text.tertiary"
                            ml={1}
                            mt={0.25}
                        >
                            beta
                        </Typography>
                    </Button>
                </Box>
                <Box
                    px={1.25}
                    display="flex"
                    borderBottom={1}
                    borderColor="borders.1"
                    alignItems="center"
                    justifyContent="space-between"
                    height={1}
                    width={MD_WO_SIDEBAR_WIDTH_SX}
                >
                    {headerContent && !isMobile && (
                        <Box
                            height={1}
                            display="flex"
                            alignItems="center"
                            width="calc(100% - 140px)"
                        >
                            {HEADER_CONTENT[headerContent]}
                        </Box>
                    )}
                    {(!headerContent || isMobile) && <div />}

                    <Box
                        height={1}
                        display="flex"
                        alignItems="center"
                    >
                        <UserHeaderTools />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
