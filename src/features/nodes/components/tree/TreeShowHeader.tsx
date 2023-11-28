import TreeBreadcrumbItem from './TreeBreadcrumbItem';
import { UUID } from '../../../../types';
import { setTransformablePositions } from '../../../app/appSlice';
import { select } from '../../actions';
import { MARGIN_TOP } from '../../constants';
import {
    selectBranchNodes, selectBranchTitles, selectSelectedNode,
} from '../../nodes.selectors';
import { AppNode } from '../../nodes.types';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs, Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TreeShowHeader() {
    const selectedNode = useSelector(selectSelectedNode);
    const { branchId } = selectedNode || {};
    const nodeTitlesById = useSelector(selectBranchTitles(branchId));
    const dispatch = useDispatch();
    const branchNodes = useSelector(selectBranchNodes(branchId)) as Record<UUID, AppNode>;

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
        dispatch(select({ id, branchId: id }));
    }, [dispatch]);

    const handleCentering = useCallback((id: UUID) => {
        const { y } = branchNodes[id];
        const scrollTop = y - MARGIN_TOP * 2;
        dispatch(setTransformablePositions({ id: branchId, scrollTop }));
    }, [branchNodes, dispatch, branchId]);

    if (!selectedNode?.id) return null;

    return (
        <Box sx={{
            width: 1,
            overflowX: 'auto',
            '::-webkit-scrollbar': { height: 6 },
            '::-webkit-scrollbar-thumb': {
                borderRadius: 2,
                maxWidth: '42px',
            },
        }}
        >
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
        </Box>
    );
}
