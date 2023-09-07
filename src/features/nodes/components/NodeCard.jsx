import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link, CardMedia,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import NcAvatar from '../../../common/components/NcAvatar';
import { selectIndexedNode } from '../nodes.selectors';
import toLocalTime from '../../../common/localTime';

function NodeCard(props) {
  const { id } = props;
  const node = useSelector(selectIndexedNode(id));

  return (
    <Box width="100%" mt={4}>
      <Card
        className="Card"
        elevation={2}
        sx={{
          borderRadius: 4,
        }}
      >
        <Link
          component={RouterLink}
          to={`/nodes/${node.rootId}/${node.id}`}
        >
          {node.coverImageUrl && (
          <CardMedia
            component="img"
            image={node.coverImageUrl}
            alt="Cover Image"
            sx={{
              height: {
                xs: 260,
                sm: 375,
              },
            }}
          />
          )}
        </Link>
        <CardHeader
          sx={{
            p: 3,
            pr: 0,
            mr: 0,
            '& .MuiCardHeader-avatar': {
              mr: 0,
            },
          }}
          avatar={(
            <Link component={RouterLink} to={`/users/${node.owner.id}`}>
              <Box display="flex" alignItems="center">
                <NcAvatar model={node.owner} />
                <Typography variant="h6" color="text.secondary" ml={1} fontWeight="bold">
                  {node.owner.name}
                </Typography>
                {node.owner.username && (
                <Typography variant="h6" color="text.disabled" ml={1}>
                  @
                  {node.owner.username}
                </Typography>
                )}
              </Box>
            </Link>
        )}
          subheader={(
            <Box display="flex" alignItems="center">
              <Box component="span" mx={1} fontSize={30}>
                ·
              </Box>
              <Typography color="text.tertiary">
                {' '}
                {toLocalTime(node.createdAt)}
              </Typography>
            </Box>
          )}
        />
        <CardContent sx={{ px: 3, pt: 0, mb: 1 }}>
          <Link
            sx={{ '&:hover h2': { color: 'text.link', textDecoration: 'underline' } }}
            component={RouterLink}
            to={`/nodes/${node.rootId}/${node.id}`}
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
          <Typography variant="body1" color="text.secondary" mt={2} sx={{ minHeight: 72 }}>
            {node.shortDescription}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

NodeCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NodeCard;
