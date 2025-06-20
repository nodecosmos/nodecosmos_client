import CheckboxToolbar from './CheckboxToolbar';
import ConflictToolbar from './NodeConflictToolbar';
import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import useModalOpen from '../../../../../../common/hooks/useModalOpen';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import { LikeType } from '../../../../../likes/likes.types';
import useAuthorizeNodeAction from '../../../../hooks/node/useAuthorizeNodeAction';
import useNodeActions from '../../../../hooks/node/useNodeActions';
import useNodeBranchContext from '../../../../hooks/node/useNodeBranchContext';
import useNodeContext from '../../../../hooks/node/useNodeContext';
import useTreeContext from '../../../../hooks/tree/useTreeContext';
import { NODE_HEIGHT } from '../../../../nodes.constants';
import { TreeType } from '../../../../nodes.types';
import LikeButton from '../../../LikeButton';
import ImportNodesModal from '../ImportNodesModal';
import {
    faDiagramSubtask, faArrowUpRightFromSquare, faArrowUpSmallBig, faUpload,
} from '@fortawesome/pro-light-svg-icons';
import {
    faPenToSquare, faTrash, faUndo, faPlus,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Tooltip, ButtonBase,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useMemo } from 'react';

function NodeToolbar() {
    const {
        isTmp,
        isRoot,
        isCurrentRoot,
        rootId,
        parentId,
        isExpanded,
        isSelected,
        branchId,
        id,
        isCreationInProgress,
        likeCount,
    } = useNodeContext();
    const {
        addNode, editNode, deleteNode, undoNodeDeletion,
    } = useNodeActions();
    const ctx = useNodeBranchContext();
    const [delModOpen, openDelMod, closeDelMod] = useModalOpen();
    const [importModOpen, openImportMod, closeImportMod] = useModalOpen();
    const authorizeNodeAction = useAuthorizeNodeAction();
    const { isBranch, isMerged } = useBranchContext();
    const handleDelete = useCallback(() => {
        if (!authorizeNodeAction()) {
            return;
        }

        if (isTmp) {
            deleteNode().catch(console.error);
        } else {
            openDelMod();
        }
    }, [authorizeNodeAction, deleteNode, isTmp, openDelMod]);

    const openParentNodeHref = useMemo(() => {
        return `/nodes/${branchId}/${parentId}?isBranchQ=${isBranch}&originalIdQ=${rootId}`;
    }, [branchId, isBranch, parentId, rootId]);

    const openRootNodeHref = useMemo(() => {
        return `/nodes/${branchId}/${rootId}?isBranchQ=${isBranch}&originalIdQ=${rootId}`;
    }, [branchId, isBranch, rootId]);

    const openNodeHref = useMemo(() => {
        return `/nodes/${branchId}/${id}?isBranchQ=${isBranch}&originalIdQ=${rootId}`;
    }, [branchId, isBranch, id, rootId]);
    const { size, type } = useTreeContext();

    if (ctx?.isOriginalDeleted) {
        return <ConflictToolbar />;
    }

    if (type === TreeType.Checkbox) {
        return <CheckboxToolbar />;
    }

    if (!isExpanded || !isSelected) return null;

    if (ctx?.isDeleted && !isMerged) {
        if (ctx?.isAncestorDeleted) {
            return null;
        }

        return (
            <div className="NodeToolbar">
                <Tooltip title="Undo Node Deletion" placement="top">
                    <ButtonBase
                        className="Item purple"
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
            <Box className="NodeToolbar" display="flex" alignItems="center" height={NODE_HEIGHT}>
                <CircularProgress color="secondary" size={20} />
            </Box>
        );
    }

    let deleteText;

    if (isBranch && !ctx?.isCreated) {
        deleteText = `This action will mark node for deletion within the contribution request. Actual deletion of the 
        node and its descendants will occur once the contribution is merged.`;
    } else if (isRoot) {
        deleteText = 'This action will permanently delete the entire node project.';
    } else {
        deleteText = 'This action will delete the node and all of its descendants including their workflows.';
    }

    let deleteConfirmText;

    if (isBranch && !ctx?.isCreated) {
        deleteConfirmText = 'Mark for deletion';
    } else if (isRoot) {
        deleteConfirmText = 'I understand, delete complete project';
    } else {
        deleteConfirmText = 'I understand, delete the node';
    }

    return (
        <div className={`NodeToolbar h-${size.height}`}>
            {
                !isMerged && (
                    <>
                        <Tooltip title="Add Node" placement="top">
                            <ButtonBase className="Item red" onClick={addNode} aria-label="Add Node">
                                <FontAwesomeIcon icon={faPlus} />
                            </ButtonBase>
                        </Tooltip>
                        <Tooltip title="Edit Node" placement="top">
                            <ButtonBase className="Item green" onClick={editNode} aria-label="Edit Node">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </ButtonBase>
                        </Tooltip>
                        {
                            !(isRoot && isBranch) && (
                                <Tooltip title="Delete Node" placement="top">
                                    <ButtonBase
                                        className="Item blue"
                                        onClick={handleDelete}
                                        aria-label="Delete Node">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </ButtonBase>
                                </Tooltip>
                            )
                        }
                    </>
                )
            }
            {isCurrentRoot && !isRoot && (
                <>
                    <Tooltip
                        title="Open Parent"
                        placement="top"
                    >
                        <ButtonBase
                            target="_blank"
                            href={openParentNodeHref}
                            className="Item blue"
                            aria-label="Open Parent Node in New Tab"
                        >
                            <FontAwesomeIcon icon={faDiagramSubtask} />
                        </ButtonBase>
                    </Tooltip>

                    <Tooltip title="Open Root" placement="top">
                        <ButtonBase
                            target="_blank"
                            href={openRootNodeHref}
                            className="Item purple"
                            aria-label="Open Root Node in New Tab"
                        >
                            <FontAwesomeIcon
                                icon={faArrowUpSmallBig}
                            />
                        </ButtonBase>
                    </Tooltip>
                </>
            )}

            {(!isCurrentRoot || isRoot) && (
                <Tooltip title="Open Node In New Tab" placement="top">
                    <ButtonBase
                        target="_blank"
                        href={openNodeHref}
                        className="Item purple"
                        aria-label="Open Node in New Tab"
                    >
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                        />
                    </ButtonBase>
                </Tooltip>
            )}

            <Tooltip title="Import From File" placement="top">
                <ButtonBase className="Item orange" onClick={openImportMod} aria-label="Edit Node">
                    <FontAwesomeIcon icon={faUpload} />
                </ButtonBase>
            </Tooltip>

            <LikeButton
                id={id}
                objectType={LikeType.Node}
                branchId={branchId}
                rootId={rootId}
                likeCount={likeCount}
            />

            <ConfirmationModal
                text={deleteText}
                confirmText={deleteConfirmText}
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onClose={closeDelMod}
                onConfirm={deleteNode}
            />
            <ImportNodesModal open={importModOpen} onClose={closeImportMod} nodeId={id} branchId={branchId} />
        </div>
    );
}

export default React.memo(NodeToolbar);
