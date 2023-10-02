import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { selectIndexedNode } from '../nodes.selectors';
import NodeCardActions from './NodeCardActions';
import NodeCardHeader from './NodeCardHeader';

function NodeCard(props) {
  const { id } = props;
  const node = useSelector(selectIndexedNode(id));

  return (
    <Box width={680} mt={2}>
      <Card
        className="Card"
        elevation={2}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'borders.3',
        }}
      >
        <NodeCardHeader node={node} />
        <CardContent sx={{ px: 3, pt: node.coverImageUrl ? 3 : 0, pb: 0 }}>
          <Link
            sx={{ '&:hover h2': { color: 'text.link', textDecoration: 'underline' } }}
            component={RouterLink}
            to={`/nodes/${node.id}`}
          >
            <Typography
              variant="h5"
              variantMapping={{ h5: 'h2' }}
              color="text.contrast"
              fontWeight="bold"
            >
              {node.title}
            </Typography>
          </Link>
          {
            node.shortDescription
            && (
            <Typography variant="body2" color="text.secondary" mt={2}>
              {node.shortDescription}
            </Typography>
            )
          }
        </CardContent>
        <NodeCardActions node={node} />
      </Card>
    </Box>
  );
}

NodeCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NodeCard;
