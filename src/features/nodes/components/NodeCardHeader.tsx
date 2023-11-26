import NcAvatar from '../../../common/components/NcAvatar';
import toLocalTime from '../../../utils/localTime';
import { IndexNode } from '../types';
import {
    Box, CardHeader, CardMedia, Link, Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function NodeCardHeader({ node }: {node: IndexNode}) {
    return (

        <Box className={node.coverImageURL ? 'CoverHeader' : ''}>
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
            {node.coverImageURL && (
                <>
                    <CardMedia
                        className="AmbientImage"
                        component="img"
                        image={node.coverImageURL}
                        alt="Cover Image Ambient"
                    />
                    <Link
                        component={RouterLink}
                        to={`/nodes/${node.id}`}
                    >
                        <CardMedia
                            className="CoverImage"
                            component="img"
                            image={node.coverImageURL}
                            alt="Cover Image"
                        />
                    </Link>

                </>
            )}
        </Box>
    );
}
