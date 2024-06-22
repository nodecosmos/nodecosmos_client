/* mui */
import UserHeaderTools from './UserHeaderTools';
import ThreadShowHeader from '../../../comments/components/thread/ThreadShowHeader';
import ContributionRequestShowHeader from '../../../contribution-requests/components/ContributionRequestShowHeader';
import NodeIndexHeader from '../../../nodes/components/header/NodeIndexHeader';
import MobileSidebarIcon from '../../../nodes/components/sidebar/MobileSidebarIcon';
import TreeShowHeader from '../../../nodes/components/tree/TreeShowHeader';
import { selectHeaderContent } from '../../app.selectors';
import {
    HEADER_HEIGHT, SIDEBAR_WIDTH, SIDEBAR_MD_SX,
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
const SIDEBAR_PATHS = ['/nodes'];
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
        !isMobile && SIDEBAR_PATHS.some((path) => location.pathname.startsWith(path))
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
                    height={1}
                    width={SIDEBAR_MD_SX}
                    display="flex"
                    alignItems="center"
                    borderRight={hasSidebar ? 1 : 0}
                    borderBottom={hasSidebar ? 0 : 1}
                    borderColor="borders.1"
                >
                    <MobileSidebarIcon />
                    <Box ml={1}>
                        <Button
                            component={Link}
                            to="/nodes"
                            className="LogoButton"
                        >
                            <img src="/logo.svg" alt="logo" height={30} width={30} />
                            <Typography fontWeight="bold">
                                <Box component="span" color="logo.blue">node</Box>
                                <Box component="span" color="logo.red">cosmos</Box>
                            </Typography>
                            <Typography
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
                </Box>
                <Box
                    display="flex"
                    width={`calc(100% - ${SIDEBAR_WIDTH})`}
                    borderBottom={1}
                    borderColor="borders.1"
                    alignItems="center"
                    justifyContent="space-between"
                    height={1}
                >
                    <Box
                        pl={1.25}
                        height={1}
                        display="flex"
                        alignItems="center"
                        width="calc(100% - 140px)"
                    >
                        {headerContent && !isMobile && HEADER_CONTENT[headerContent]}
                    </Box>
                    <Box
                        mr={2}
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
