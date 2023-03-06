import React from 'react';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumbs, Link } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { selectNodeTitlesById, selectSelectedNode } from '../nodes.selectors';
import { setSelectedNode } from '../nodesSlice';

export default function NodeBreadcrumbs() {
  const selectedNode = useSelector(selectSelectedNode);
  const nodeTitlesById = useSelector(selectNodeTitlesById);

  const dispatch = useDispatch();

  const items = [];

  if (selectedNode && selectedNode.ancestorIds) {
    const ancestorIds = [...selectedNode.ancestorIds];
    ancestorIds.reverse()
      .forEach((id) => {
        if (nodeTitlesById[id]) {
          items.push(
            {
              id,
              title: nodeTitlesById[id],
            },
          );
        }
      });
  }

  items.push({
    id: selectedNode.id,
    title: nodeTitlesById[selectedNode.id],
  });

  if (!selectedNode.id) return null;

  const handleClick = (id) => {
    dispatch(setSelectedNode(id));
  };

  const separator = (
    <FontAwesomeIcon icon={faChevronRight} />
  );

  return (
    <Box sx={{
      overflowX: 'auto',
      '::-webkit-scrollbar': { height: 5 },
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
        separator={separator}
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
        }}
      >
        {items.map((item) => (
          <div className="BreadcrumbItem" key={item.id}>
            <Link
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
