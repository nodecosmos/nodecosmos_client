import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/* mui */
import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

/* nodecosmos */
import MicroAvatar from '../../nodecosmos/MicroAvatar';

function NodeCard(props) {
  const {
    node,
  } = props;

  return (
    <Card className="Card">
      <CardHeader
        avatar={(
          <Link to={`users/${node.owner.id}`}>
            <MicroAvatar user={node.owner} />
          </Link>
        )}
        title={<Link to={`nodes/${node.id}`}>{node.title}</Link>}
        subheader={node.created_at}
      />
      <CardContent>
        {node.description}
      </CardContent>
    </Card>
  );
}

// NodeTab.defaultProps = {
//   defaultValue: null,
// };

NodeCard.propTypes = {
  node: PropTypes.object.isRequired,
};

export default NodeCard;
