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
    <Box width={680} mt={2}>
      <Card
        className="Card"
        elevation={2}
        sx={{
          borderRadius: 4,
          // border: 1,
          borderColor: 'borders.3',
        }}
      >
        <Link
          component={RouterLink}
          to={`/nodes/${node.rootId}/${node.id}`}
        >
          <Box className={node.coverImageUrl && 'CoverHeader'}>
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
                <Box display="flex" alignItems="center" zIndex={1} position="relative">
                  <Link component={RouterLink} to={`/users/${node.owner.id}`}>
                    <NcAvatar model={node.owner} />
                  </Link>
                  <Link component={RouterLink} to={`/users/${node.owner.id}`}>
                    <Typography variant="h6" color="text.primary" ml={1} fontWeight="bold">
                      {node.owner.name}
                    </Typography>
                  </Link>
                  <Link
                    component={RouterLink}
                    to={`/users/${node.owner.id}`}
                    sx={{
                      '&:hover h6': {
                        color: 'text.link',
                      },
                    }}
                  >
                    {node.owner.username && (
                      <Typography variant="h6" color="text.tertiary" ml={1}>
                        @
                        {node.owner.username}
                      </Typography>
                    )}
                  </Link>
                </Box>
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
            {node.coverImageUrl && (
              <>
                <CardMedia
                  className="AmbientImage"
                  component="img"
                  image={node.coverImageUrl}
                  alt="Cover Image Ambient"
                />
                <CardMedia
                  className="CoverImage"
                  component="img"
                  image={node.coverImageUrl}
                  alt="Cover Image"
                />
              </>

            )}

          </Box>
        </Link>

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
