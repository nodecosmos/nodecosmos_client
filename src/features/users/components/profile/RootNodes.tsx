import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import CreateNodeModal from '../../../nodes/components/CreateNodeModal';
import { selectNodesByEditor, selectNodesByOwner } from '../../../nodes/nodes.selectors';
import { NodeByOwner } from '../../../nodes/nodes.types';
import useProfileUser from '../../hooks/useProfileUser';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    Button, Chip, Tooltip, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RootNodes() {
    const user = useProfileUser();
    const nodes = useSelector(selectNodesByOwner(user.id));
    const editorNodes = useSelector(selectNodesByEditor(user.id));
    const [originalNodes] = useMemo(() => {
        const originalNodes: NodeByOwner[] = [];
        const branchNodes: NodeByOwner[] = [];

        nodes.forEach(node => {
            if (node.branchId === node.rootId) {
                originalNodes.push(node);
            } else {
                branchNodes.push(node);
            }
        });

        return [originalNodes, branchNodes];
    }, [nodes]);
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();

    return (
        <div>
            <Box my={2}>
                <DefaultButton
                    className="ml-1"
                    variant="outlined"
                    color="buttonContrast"
                    title="Add Root Node"
                    startIcon={faPlus}
                    onClick={openCreateNodeDialog}
                />
                <CreateNodeModal
                    open={createNodeDialogOpen}
                    onClose={closeNodeDialog}
                />
            </Box>
            {
                (nodes.length > 0) && (
                    <Box borderBottom={1} borderColor="divider" pb={2}>
                        <Typography variant="h2" color="texts.secondary">
                            Owned Roots
                            <Chip
                                className="ml-1"
                                component="span"
                                color="button"
                                label={originalNodes.length}
                                size="small"
                            />
                        </Typography>
                        <Typography variant="body1" color="texts.secondary" my={2}>
                            Root nodes are the top-level nodes in the tree.
                        </Typography>
                        {
                            originalNodes.map((node) => (
                                <Tooltip title="Go to Node" key={node.id}>
                                    <Button
                                        className="my-1 mx-1"
                                        component={Link}
                                        to={`/nodes/${node.branchId}/${node.id}`}
                                        variant="contained"
                                        disableElevation
                                        color="button"
                                        startIcon={<FontAwesomeIcon icon={faHashtag} />}
                                    >
                                        {node.title}
                                    </Button>
                                </Tooltip>
                            ))
                        }
                    </Box>
                )
            }

            {
                (editorNodes.length > 0) && (
                    <div className="mt-2">
                        <Typography variant="h2" color="texts.secondary">
                            Editor Roots
                            <Chip
                                className="ml-1"
                                component="span"
                                color="button"
                                label={editorNodes.length}
                                size="small"
                            />
                        </Typography>
                        <Typography variant="body1" color="texts.secondary" my={2}>
                            Editor roots are the highest-level nodes in the tree where you are an editor.
                        </Typography>
                        {
                            editorNodes.map((node) => (
                                <Tooltip title="Go to Node" key={node.id}>
                                    <Button
                                        className="my-1 mx-1"
                                        component={Link}
                                        to={`/nodes/${node.branchId}/${node.id}`}
                                        variant="contained"
                                        disableElevation
                                        color="button"
                                        startIcon={<FontAwesomeIcon icon={faHashtag} />}
                                    >
                                        {node.title}
                                    </Button>
                                </Tooltip>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
