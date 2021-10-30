import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* material-ui */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

/* micro */
import MicroAvatar from '../microcosmos/MicroAvatar';

function MicronCard(props) {
  const {
    micron,
  } = props;

  return (
    <Card className="Card">
      <CardHeader
        avatar={(
          <Link to={`users/${micron.owner.id}`}>
            <MicroAvatar user={micron.owner} />
          </Link>
        )}
        title={<Link to={`microns/${micron.id}`}>{micron.title}</Link>}
        subheader={micron.created_at}
      />
      <CardContent>
        {micron.description}
      </CardContent>
    </Card>
  );
}

// Micron.defaultProps = {
//   defaultValue: null,
// };

MicronCard.propTypes = {
  micron: PropTypes.object.isRequired,
};

export default MicronCard;
