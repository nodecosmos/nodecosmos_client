import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import UserAvatar from '../../../common/components/UserAvatar';
import { selectIndexedNode } from '../nodes.selectors';

function NodeCard(props) {
  const { id } = props;
  const node = useSelector(selectIndexedNode(id));

  return (
    <Box width="100%" mt={2}>
      <Card className="Card" elevation={2} sx={{ p: 1, borderRadius: 4 }}>
        <CardHeader
          avatar={(
            <Link to={`/users/${node.owner.id}`}>
              <UserAvatar user={node.owner} />
            </Link>
        )}
          title={(
            <Link component={RouterLink} to={`/users/${node.owner.id}`}>
              <Typography variant="body1" color="text.secondary">
                {node.owner.username}
              </Typography>
            </Link>
)}
          subheader={(
            <Typography color="text.tertiary">
              {node.createdAt}
            </Typography>
          )}
        />
        <CardContent sx={{ ml: 8, p: 0 }}>
          <Link component={RouterLink} to={`/nodes/${node.rootId}/${node.id}`}>
            <Typography
              variant="h5"
              variantMapping={{ h5: 'h2' }}
              color="text.contrast"
              fontWeight="bold"
            >
              {node.title}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
}

NodeCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NodeCard;
