import { NodecosmosDispatch } from '../../../../store';
import { NodecosmosTheme } from '../../../../themes/themes.types';
import { ObjectType } from '../../../../types';
import useAppContext from '../../../app/hooks/useAppContext';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import {
    select, selectNodeFromParams, setNodeScrollTo,
} from '../../../nodes/nodes.actions';
import { AppNode } from '../../../nodes/nodes.types';
import { NODE_BUTTON_HEIGHT } from '../../../workflows/constants';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
    node: AppNode;
}

function CommitNode({ node }: Props) {
    const {
        originalId, branchId, nodeId,
    } = useBranchContext();
    const { id } = node;
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[(node?.ancestorIds?.length || 0) % backgroundCount];
    const navigate = useNavigate();
    const { selectObject } = useAppContext();
    const dispatch: NodecosmosDispatch = useDispatch();

    const handleClick = useCallback(() => {
        selectObject({
            objectId: id,
            originalId,
            branchId,
            objectNodeId: id,
            objectType: ObjectType.Node,
            metadata: { ancestorIds: node?.ancestorIds || [] },
        });
        dispatch(select({
            branchId,
            id,
        }));

        navigate(
            `/nodes/${originalId}/${nodeId}/contribution_requests/${branchId}/tree`,
        );

        dispatch(selectNodeFromParams({
            branchId,
            id,
        }));

        setTimeout(() => {
            dispatch(setNodeScrollTo(id));
        }, 250);
    }, [branchId, dispatch, id, navigate, node?.ancestorIds, nodeId, originalId, selectObject]);

    if (!node) {
        return null;
    }

    return (
        <ButtonBase
            type="button"
            className="NodeButton"
            style={{
                border: '1px solid',
                borderColor: nestedTreeColor.fg,
                backgroundColor: nestedTreeColor.bg,
                height: NODE_BUTTON_HEIGHT,
                color: nestedTreeColor.fg,
            }}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faHashtag} />
            <div className="NodeButtonText">
                {node.title}
            </div>
        </ButtonBase>
    );
}

export default React.memo(CommitNode);
