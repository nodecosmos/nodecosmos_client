import * as React from 'react';
import Box from '@mui/material/Box';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

/* mui */
import {
  Card,
  CardContent,
  CardHeader,
  Link,
} from '@mui/material';

/* nodecosmos */
import NodeAvatar from '../../app/components/NodeAvatar';

function NodeCard(props) {
  const { id } = props;
  const node = useSelector((state) => state.nodes[id]);

  return (
    <Box width="60%" p={2}>
      <Card className="Card" elevation={2}>
        <CardHeader
          avatar={(
            <Link to={`/users/${node.owner.id}`}>
              <NodeAvatar user={node.owner} />
            </Link>
        )}
          title={<Link component={RouterLink} to={`/nodes/${node.id}`}>{node.title}</Link>}
          subheader={node.created_at}
        />
        <CardContent>
          {node.description}
        </CardContent>
      </Card>
    </Box>
  );
}

NodeCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NodeCard;
