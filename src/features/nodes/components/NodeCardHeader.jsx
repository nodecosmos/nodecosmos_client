import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box, CardHeader, CardMedia, Link, Typography,
} from '@mui/material';
import NcAvatar from '../../../common/components/NcAvatar';
import toLocalTime from '../../../common/localTime';

export default function NodeCardHeader({ node }) {
    return (

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
                    <Link
                        component={RouterLink}
                        to={`/nodes/${node.id}`}
                    >
                        <CardMedia
                            className="CoverImage"
                            component="img"
                            image={node.coverImageUrl}
                            alt="Cover Image"
                        />
                    </Link>

                </>
            )}
        </Box>
    );
}

NodeCardHeader.propTypes = {
    node: PropTypes.object.isRequired,
};
