import ContributionRequestMergeButton from './ContributionRequestMergeButton';
import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../app/constants';
import {
    faCodeCommit, faHashtag, faListTree, faComments,
} from '@fortawesome/pro-light-svg-icons';
import { Box } from '@mui/material';
import React from 'react';

export default function ContributionRequestsShowToolbar() {
    return (
        <Box
            display="flex"
            alignItems="center"
            height={HEADER_HEIGHT}
            borderBottom={1}
            borderColor="borders.1"
            pl={1}
        >
            <ToolbarContainer
                hasText
                round={false}
                showIndicator={false}
                size={32}
                mr={1}
                borderRadius={1.25}
                hoverColor="backgrounds.7"
                activeColor="backgrounds.7"
                overflowX="auto"
            >
                <ToolbarItem
                    title="Conversation"
                    icon={faComments}
                    color="texts.primary"
                    titleAsTooltip={false}
                    to="."
                    additionalActivePaths={['activity', null, null]}
                />
                <ToolbarItem
                    title="Tree changes"
                    icon={faHashtag}
                    color="texts.primary"
                    titleAsTooltip={false}
                    to="tree"
                />
                <ToolbarItem
                    title="Workflow changes"
                    icon={faCodeCommit}
                    color="texts.primary"
                    titleAsTooltip={false}
                    to="workflow"
                />
                <ToolbarItem
                    title="Commits"
                    icon={faListTree}
                    color="texts.primary"
                    titleAsTooltip={false}
                    to="commits"
                />
                <Box ml={1}>
                    <ContributionRequestMergeButton />
                </Box>
            </ToolbarContainer>
        </Box>
    );
}
