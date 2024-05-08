import ConflictToolbar from './NodeConflictToolbar';
import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import useModalOpen from '../../../../../../common/hooks/useModalOpen';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import { LikeType } from '../../../../../likes/likes.types';
import useNodeActions from '../../../../hooks/tree/node/useNodeActions';
import useNodeBranchContext from '../../../../hooks/tree/node/useNodeBranchContext';
import useNodeContext from '../../../../hooks/tree/node/useNodeContext';
import { NODE_BUTTON_HEIGHT } from '../../../../nodes.constants';
import { selectNode } from '../../../../nodes.selectors';
import LikeButton from '../../../LikeButton';
import {
    faArrowUpRightFromSquare, faPenToSquare, faTrash, faUndo,
} from '@fortawesome/pro-regular-svg-icons';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Tooltip, ButtonBase,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function NodeToolbar() {
    const {
        isRoot,
        isExpanded,
        isSelected,
        branchId,
        id,
        isCreationInProgress,
    } = useNodeContext();
    const {
        addNode, editNode, deleteNode, undoNodeDeletion,
    } = useNodeActions();
    const { likeCount } = useSelector(selectNode(branchId, id));
    const {
        isOriginalDeleted, isDeleted, isAncestorDeleted, isCreated,
    } = useNodeBranchContext();
    const [delModOpen, openDelMod, closeDelMod] = useModalOpen();
    const handleDelete = useCallback(async () => {
        await deleteNode();
        closeDelMod();
    }, [closeDelMod, deleteNode]);
    const { isBranch } = useBranchContext();

    if (isOriginalDeleted) {
        return <ConflictToolbar />;
    }

    if (!isExpanded || !isSelected) return null;

    if (isDeleted) {
        if (isAncestorDeleted) {
            return null;
        }

        return (
            <div className="NodeToolbar">
                <Tooltip title="Undo Node Deletion" placement="top">
                    <ButtonBase
                        className="Item"
                        onClick={undoNodeDeletion}
                        aria-label="Undo Node Deletion">
                        <FontAwesomeIcon icon={faUndo} />
                    </ButtonBase>
                </Tooltip>
            </div>
        );
    }

    if (isCreationInProgress) {
        return (
            <Box className="NodeToolbar" display="flex" alignItems="center" height={NODE_BUTTON_HEIGHT}>
                <CircularProgress color="secondary" size={20} />
            </Box>
        );
    }

    let deleteText;

    if (isBranch && !isCreated) {
        deleteText = `This action will mark node for deletion within the contribution request. Actual deletion of the 
        node and its descendants will occur once the contribution is merged.`;
    } else if (isRoot) {
        deleteText = 'This action will permanently delete the entire node project.';
    } else {
        deleteText = 'This action will delete the node and all of its descendants including their workflows.';
    }

    let deleteConfirmText;

    if (isBranch && !isCreated) {
        deleteConfirmText = 'Mark for deletion';
    } else if (isRoot) {
        deleteConfirmText = 'I understand, delete complete project';
    } else {
        deleteConfirmText = 'I understand, delete the node';
    }

    return (
        <div className="NodeToolbar">
            <Tooltip title="Add Node" placement="top">
                <ButtonBase className="Item" onClick={addNode} aria-label="Add Node">
                    <FontAwesomeIcon icon={faPlus} />
                </ButtonBase>
            </Tooltip>
            <Tooltip title="Edit Node" placement="top">
                <ButtonBase className="Item" onClick={editNode} aria-label="Edit Node">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </ButtonBase>
            </Tooltip>
            {
                !(isRoot && isBranch) && (
                    <Tooltip title="Delete Node" placement="top">
                        <ButtonBase
                            className="Item"
                            onClick={openDelMod}
                            aria-label="Delete Node">
                            <FontAwesomeIcon icon={faTrash} />
                        </ButtonBase>
                    </Tooltip>
                )
            }
            <LikeButton
                id={id}
                objectType={LikeType.Node}
                branchId={branchId}
                likeCount={likeCount} />

            <Tooltip title="Open Node In New Tab" placement="top">
                <ButtonBase
                    target="_blank"
                    href={`/nodes/${branchId}/${id}`}
                    className="Item"
                    aria-label="Open Node in New Tab"
                >
                    <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                    />
                </ButtonBase>
            </Tooltip>
            <ConfirmationModal
                text={deleteText}
                confirmText={deleteConfirmText}
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onCancel={closeDelMod}
                onConfirm={handleDelete}
            />
        </div>
    );
}
