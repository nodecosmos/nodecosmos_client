import TreeBreadcrumbItem from './TreeBreadcrumbItem';
import { ObjectType, UUID } from '../../../../types';
import { useSelectObject } from '../../../app/hooks/useSelectObject';
import { selectBranchTitles, selectSelectedNode } from '../../nodes.selectors';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

const SLOT_PROPS = { collapsedIcon: { sx: { color: 'texts.tertiary' } } };

export default function TreeBreadcrumbs() {
    const selectedNode = useSelector(selectSelectedNode);
    const branchId = selectedNode?.branchId;
    const nodeTitlesById = useSelector(selectBranchTitles(branchId));
    const items: { id: UUID; title?: string; }[] = [];
    const selectObject = useSelectObject();

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
        selectObject({
            originalId: selectedNode?.rootId,
            objectId: id,
            branchId,
            objectNodeId: id,
            objectType: ObjectType.Node,
        });
    }, [branchId, selectObject, selectedNode]);

    return (
        <Breadcrumbs
            maxItems={5}
            itemsAfterCollapse={2}
            itemsBeforeCollapse={2}
            aria-label="breadcrumb"
            separator={<FontAwesomeIcon icon={faChevronRight} />}
            slotProps={SLOT_PROPS}
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
