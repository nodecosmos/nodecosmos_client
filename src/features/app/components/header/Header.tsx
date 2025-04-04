/* mui */
import ThemeMenu from './ThemeMenu';
import UserHeaderTools from './UserHeaderTools';
import ThreadShowHeader from '../../../comments/components/thread/ThreadShowHeader';
import ContributionRequestShowHeader from '../../../contribution-requests/components/ContributionRequestShowHeader';
import NodeIndexHeader from '../../../nodes/components/header/NodeIndexHeader';
import MobileSidebarIcon from '../../../nodes/components/sidebar/MobileSidebarIcon';
import TreeShowHeader from '../../../nodes/components/tree/TreeShowHeader';
import { selectCurrentNode, selectHeaderContent } from '../../app.selectors';
import { HeaderContent } from '../../app.types';
import {
    HEADER_HEIGHT, MD_WO_SIDEBAR_WIDTH_SX, SIDEBAR_MD_SX,
} from '../../constants';
import useIsMobile from '../../hooks/useIsMobile';
import { faHashtag as faHashtagSolid, faHome } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, IconButton, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

/* nodecosmos */
const NON_HEADER_PATHS = ['/auth/login', '/auth/signup'];
const NON_SIDEBAR_PATHS = ['/auth/login', '/auth/signup', '/reset_password', '/404', '/contact'];
const HEADER_CONTENT = {
    NodeIndexHeader: <NodeIndexHeader />,
    TreeShowHeader: <TreeShowHeader />,
    ContributionRequestShowHeader: <ContributionRequestShowHeader />,
    ThreadShowHeader: <ThreadShowHeader />,
};

export default function Header() {
    const location = useLocation();
    const headerContent = useSelector(selectHeaderContent);
    const currentNode = useSelector(selectCurrentNode);
    const isMobile = useIsMobile();
    const hasSidebar = useMemo(() => (
        !isMobile && !NON_SIDEBAR_PATHS.some((path) => location.pathname.startsWith(path))
    ), [isMobile, location.pathname]);

    if (NON_HEADER_PATHS.includes(location.pathname)) return null;

    const isIndex = location.pathname === '/nodes';
    const isUsernameUpdate = location.pathname === '/auth/update_username';

    if (isUsernameUpdate) {
        return null;
    }

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
                    justifyContent="center"
                    borderRight={hasSidebar ? 1 : 0}
                    borderBottom={hasSidebar ? 0 : 1}
                    borderColor="borders.1"
                >
                    <MobileSidebarIcon />
                    <Button
                        color="secondary"
                        component={Link}
                        to={isIndex ? 'https://nodecosmos.com/' : '/nodes'}
                        relative={isIndex ? 'route' : 'path'}
                        className="min-vis-width-viewport-600"
                    >
                        <img src="/static/logo-4.svg" alt="logo" height={12} width="auto" />
                    </Button>
                </Box>
                <Box
                    display="flex"
                    borderBottom={1}
                    borderColor="borders.1"
                    alignItems="center"
                    justifyContent="space-between"
                    height={1}
                    width={MD_WO_SIDEBAR_WIDTH_SX}
                >
                    {/*add home button*/}
                    {
                        !isIndex && (
                            <>
                                <IconButton
                                    component={Link}
                                    to="/nodes"
                                    className="ml-1 fs-18 toolbar-default"
                                >
                                    <FontAwesomeIcon icon={faHome} />
                                </IconButton>
                            </>
                        )
                    }
                    { headerContent !== HeaderContent.TreeShowHeader && currentNode
                        && (
                            <div className="flex-1">
                                <Typography
                                    className={'display-flex align-center flex-1'
                                            + 'text-tertiary ml-1 background-3 p-05 px-1 w-fit-content'}
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="texts.tertiary"
                                    borderRadius={1}
                                >
                                    <FontAwesomeIcon fontSize="14px" icon={faHashtagSolid} />
                                    <span className="ml-1">{currentNode.title}</span>
                                </Typography>
                            </div>
                        )
                    }
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
                    <ThemeMenu />

                    <Box
                        mr={1}
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
