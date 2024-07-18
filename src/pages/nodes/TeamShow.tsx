import Alert from '../../common/components/Alert';
import ToolbarContainer from '../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../features/app/constants';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import Editors from '../../features/nodes/components/team/Editors';
import Invitations from '../../features/nodes/components/team/Invitations';
import { maybeSelectNode } from '../../features/nodes/nodes.selectors';
import UserProfileLink from '../../features/users/components/UserProfileLink';
import { faUserPen, faCalendarUsers } from '@fortawesome/pro-light-svg-icons';
import { Box, Typography } from '@mui/material';
import React, {
    useCallback, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';

export default function TeamShow() {
    const { branchId, nodeId } = useBranchContext();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const [value, setValue] = useState(0);
    const invitationRef = useRef<HTMLDivElement | null>(null);
    const editorsRef = useRef<HTMLDivElement | null>(null);

    const setInvitations = useCallback(() => {
        setValue(0);
        if (invitationRef.current) {
            invitationRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const setEditors = useCallback(() => {
        setValue(1);
        if (editorsRef.current) {
            editorsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!node || !node.owner) {
        return null;
    }

    return (
        <Box width={1} height={1}>
            <Box height={HEADER_HEIGHT} borderBottom={1} borderColor="borders.3" pl={1}>
                <ToolbarContainer
                    hasText
                    round={false}
                    showIndicator={false}
                    size={32}
                    mr={1}
                    borderRadius={1.25}
                    hoverColor="background.7"
                    activeColor="background.7"
                >
                    <ToolbarItem
                        active={value === 0}
                        title="Invitations"
                        icon={faCalendarUsers}
                        color="text.primary"
                        titleAsTooltip={false}
                        onClick={setInvitations}
                    />
                    <ToolbarItem
                        active={value === 1}
                        title="Editors"
                        icon={faUserPen}
                        color="text.primary"
                        titleAsTooltip={false}
                        onClick={setEditors}
                    />
                </ToolbarContainer>
            </Box>
            <Alert position="relative" mb={2} />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" position="relative">
                <Box borderBottom={1} borderColor="borders.3" p={4}>
                    <Typography fontWeight="bold" color="text.secondary">
                        Author
                    </Typography>
                    <UserProfileLink id={node.owner.id} mt={2} />
                </Box>
                <div ref={invitationRef}>
                    <Invitations />
                </div>
                <Box ref={editorsRef}>
                    <Editors />
                </Box>
            </Box>
        </Box>
    );
}
