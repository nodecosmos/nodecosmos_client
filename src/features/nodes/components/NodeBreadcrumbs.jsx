import React from 'react';
import { faChevronRight, faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Breadcrumbs, IconButton, Link, Tooltip, useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setTransformablePositions } from '../../app/appSlice';
import { MARGIN_TOP } from '../../trees/trees.constants';
import { selectPositionsByNodeId, selectSelectedTreeNode } from '../../trees/trees.selectors';
import {
  selectNodeTitlesById, selectSelectedNode,
} from '../nodes.selectors';
import { setSelectedNode } from '../nodesSlice';

export default function NodeBreadcrumbs() {
  const selectedNode = useSelector(selectSelectedNode);
  const nodeTitlesById = useSelector(selectNodeTitlesById);

  const selectedTreeNode = useSelector(selectSelectedTreeNode);
  const positionsById = useSelector(selectPositionsByNodeId);

  const dispatch = useDispatch();

  const items = [];

  if (selectedNode && selectedNode.ancestorIds) {
    const ancestorIds = [...selectedNode.ancestorIds];

    ancestorIds.reverse()
      .forEach((id, index) => {
        if (nodeTitlesById[id]) {
          items.push(
            {
              id,
              treeNodeId: selectedTreeNode.treeAncestorIds[index],
              title: nodeTitlesById[id],
            },
          );
        }
      });
  }

  items.push({
    id: selectedNode.id,
    treeNodeId: selectedTreeNode.treeNodeId,
    title: nodeTitlesById[selectedNode.id],
  });

  const handleClick = (id) => {
    dispatch(setSelectedNode(id));
  };

  const handleCentering = (treeNodeId) => {
    const { y } = positionsById[treeNodeId];
    const scrollTop = y - MARGIN_TOP * 2;
    dispatch(setTransformablePositions({ id: selectedNode.rootId, scrollTop }));
  };

  const theme = useTheme();
  const nestedLevelColors = [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3];
  const getNestedLevelColor = (index) => nestedLevelColors[index % 3];

  if (!selectedNode.id) return null;

  return (
    <Box sx={{
      overflowX: 'auto',
      '::-webkit-scrollbar': { height: 8 },
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
        sx={{
          width: 'max-content',
          '.BreadcrumbItem': {
            display: 'flex',
            alignItems: 'center',
          },
          a: {
            color: 'text.tertiary',
            cursor: 'pointer',
            fontSize: '0.9rem',
          },
          '.MuiBreadcrumbs-separator': {
            color: 'toolbar.default',
            fontSize: '0.75rem',
            mx: 2,
          },
          'button, button:hover': {
            backgroundColor: 'toolbar.active',
          },
          '.tools': {
            color: 'toolbar.active',
            background: 'transparent',
            fontSize: '0.6rem',
            ml: 1,
          },
        }}
      >
        {items.map((item, index) => (
          <div
            className="BreadcrumbItem"
            key={item.id}
          >
            <Link
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </Link>
            <Tooltip title="focus" placement="top">
              <IconButton
                size="small"
                className="tools"
                onClick={() => handleCentering(item.treeNodeId)}
                sx={{
                  '&:hover': {
                    color: getNestedLevelColor(index),
                  },
                }}
              >
                <FontAwesomeIcon icon={faCircle} />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
