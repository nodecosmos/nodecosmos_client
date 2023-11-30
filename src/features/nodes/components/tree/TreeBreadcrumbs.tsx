import TreeBreadcrumbItem from './TreeBreadcrumbItem';
import { UUID } from '../../../../types';
import { setTransformablePositions } from '../../../app/appSlice';
import { select } from '../../actions';
import { MARGIN_TOP } from '../../nodes.constants';
import {
    selectBranchNodes, selectBranchTitles, selectSelected, selectSelectedNode,
} from '../../nodes.selectors';
import { AppNode, PKWithTreeBranch } from '../../nodes.types';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TreeBreadcrumbs() {
    const { treeBranchId, branchId } = useSelector(selectSelected) as PKWithTreeBranch;
    const selectedNode = useSelector(selectSelectedNode);
    const nodeTitlesById = useSelector(selectBranchTitles(treeBranchId));
    const dispatch = useDispatch();
    const branchNodes = useSelector(selectBranchNodes(treeBranchId as UUID)) as Record<UUID, AppNode>;

    const items: { id: UUID; title?: string; }[] = [];

    if (selectedNode && selectedNode.ancestorIds) {
        const ancestorIds = [...selectedNode.ancestorIds];

        ancestorIds.forEach((ancestorId) => {
            if (nodeTitlesById && nodeTitlesById[ancestorId]) {
                items.push(
                    {
                        id: ancestorId,
                        title: nodeTitlesById[ancestorId],
                    },
                );
            }
        });
    }

    const isSelectedNodeAlreadyInBreadcrumbs = items.some((item) => item.id === selectedNode?.id);
    if (nodeTitlesById && selectedNode && !isSelectedNodeAlreadyInBreadcrumbs && isSelectedNodeAlreadyInBreadcrumbs) {
        items.push({
            id: selectedNode.id,
            title: nodeTitlesById[selectedNode.id],
        });
    }

    const handleClick = useCallback((id: UUID) => {
        dispatch(select({
            treeBranchId: treeBranchId as UUID,
            branchId: branchId as UUID,
            id,
        }));
    }, [branchId, dispatch, treeBranchId]);

    const handleCentering = useCallback((id: UUID) => {
        const { y } = branchNodes[id];
        const scrollTop = y - MARGIN_TOP * 2;
        dispatch(setTransformablePositions({
            id: treeBranchId,
            scrollTop,
        }));
    }, [branchNodes, dispatch, treeBranchId]);

    return (
        <Breadcrumbs
            maxItems={5}
            itemsAfterCollapse={2}
            itemsBeforeCollapse={2}
            aria-label="breadcrumb"
            separator={<FontAwesomeIcon icon={faChevronRight} />}
        >
            {items.map((item, index) => (
                <TreeBreadcrumbItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    index={index}
                    handleClick={handleClick}
                    handleCentering={handleCentering} />
            ))}
        </Breadcrumbs>
    );
}
