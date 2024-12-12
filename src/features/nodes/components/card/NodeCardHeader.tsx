import NcAvatar from '../../../../common/components/NcAvatar';
import { timeSince } from '../../../../utils/localTime';
import { IndexNode } from '../../nodes.types';
import {
    Box, CardHeader, CardMedia, Link, Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function NodeCardHeader({ node }: {node: IndexNode}) {
    return (
        <Box className={node.coverImageUrl ? 'CoverHeader' : ''}>
            <CardHeader
                className="CardHeader"
                avatar={(
                    <Box display="flex" alignItems="center" zIndex={1} position="relative">
                        <Link component={RouterLink} to={`/${node.owner.username}`}>
                            <NcAvatar name={node.owner.name} src={node.owner.profileImageUrl} size={45} />
                        </Link>
                    </Box>
                )}
                subheader={(
                    <Box ml={0}>
                        <Box display="flex" alignItems="center">
                            <Link component={RouterLink} to={`/${node.owner.username}`}>
                                <Typography variant="h6" color="texts.primary" fontWeight="bold" fontSize={18}>
                                    {node.owner.name}
                                </Typography>
                            </Link>
                            <Link
                                className="Link"
                                component={RouterLink}
                                to={`/${node.owner.username}`}
                            >
                                {node.owner.username && (
                                    <Typography variant="body1" color="texts.tertiary" ml={1}>
                                        @
                                        {node.owner.username}
                                    </Typography>
                                )}
                            </Link>
                        </Box>
                        <Typography color="texts.tertiary" variant="subtitle1">
                            {timeSince(node.createdAt)}
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
                        to={`/nodes/${node.rootId}/${node.id}`}
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
