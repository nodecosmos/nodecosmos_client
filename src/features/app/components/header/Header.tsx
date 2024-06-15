/* mui */
import UserHeaderTools from './UserHeaderTools';
import ContributionRequestShowHeader from '../../../contribution-requests/components/ContributionRequestShowHeader';
import NodeIndexHeader from '../../../nodes/components/header/NodeIndexHeader';
import TreeShowHeader from '../../../nodes/components/tree/TreeShowHeader';
import { selectHeaderContent } from '../../app.selectors';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../constants';
import {
    Box, Button, Chip, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

/* nodecosmos */

const NON_HEADER_PATHS = ['/auth/login', '/auth/signup'];
const SIDEBAR_PATHS = ['/nodes'];

export default function Header() {
    const headerContents = {
        NodeIndexHeader: <NodeIndexHeader />,
        TreeShowHeader: <TreeShowHeader />,
        ContributionRequestShowHeader: <ContributionRequestShowHeader />,
    };
    const location = useLocation();
    const headerContent = useSelector(selectHeaderContent);

    if (NON_HEADER_PATHS.includes(location.pathname)) return null;

    const hasSidebar = SIDEBAR_PATHS.some((path) => location.pathname.startsWith(path));

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
                    width={SIDEBAR_WIDTH}
                    display="flex"
                    alignItems="center"
                    pl={2}
                    borderRight={hasSidebar ? 1 : 0}
                    borderBottom={hasSidebar ? 0 : 1}
                    borderColor="borders.1"
                >
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
                    </Button>
                    <Chip
                        size="small"
                        label="beta"
                        sx={{
                            ml: 1,
                            width: 50,
                            borderColor: 'transparent',
                            color: 'toolbar.default',
                        }}
                    />
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
                        {headerContent && headerContents[headerContent]}
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
