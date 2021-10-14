import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* material-ui */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

function Micron(props) {
  const {
    micron,
  } = props;

  return (
    <Card className="Card">
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe">
            R
          </Avatar>
        )}
        title={micron.title}
        subheader={micron.created_at}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">{micron.description}</Typography>
      </CardContent>
    </Card>
  );
}

// Micron.defaultProps = {
//   defaultValue: null,
// };

Micron.propTypes = {
  micron: PropTypes.object.isRequired,
};

export default Micron;
