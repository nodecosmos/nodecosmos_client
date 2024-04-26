import TreeBreadcrumbItem from './TreeBreadcrumbItem';
import { NodecosmosDispatch } from '../../../../store';
import { UUID } from '../../../../types';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { select } from '../../nodes.actions';
import { selectBranchTitles, selectSelectedNode } from '../../nodes.selectors';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TreeBreadcrumbs() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch, currentBranchId } = useBranchParams();
    const selectedNode = useSelector(selectSelectedNode);
    const nodeTitlesById = useSelector(selectBranchTitles(currentBranchId));
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

    const alreadyInBreadcrumbs = items.some((item) => item.id === selectedNode?.id);
    if (nodeTitlesById && selectedNode && !alreadyInBreadcrumbs) {
        items.push({
            id: selectedNode.id,
            title: nodeTitlesById[selectedNode.id],
        });
    }

    const handleClick = useCallback((id: UUID) => {
        const branchId = isBranch ? currentBranchId : id;

        dispatch(select({
            currentBranchId,
            branchId: branchId as UUID,
            id,
        }));
    }, [isBranch, dispatch, currentBranchId]);

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
                />
            ))}
        </Breadcrumbs>
    );
}
