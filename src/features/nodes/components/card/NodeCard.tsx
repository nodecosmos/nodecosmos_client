import NodeCardActions from './NodeCardActions';
import NodeCardHeader from './NodeCardHeader';
import { UUID } from '../../../../types';
import { selectIndexedNode } from '../../nodes.selectors';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Link, Chip,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function NodeCard({ id }: {id: UUID}) {
    const node = useSelector(selectIndexedNode(id));

    return (
        <Box
            width={1}
            display="flex"
            justifyContent="center">
            <Box width={680} mt={2}>
                <Card className="Card" elevation={2}>
                    <NodeCardHeader node={node} />
                    <CardContent className={`CardContent ${node.coverImageUrl ? 'CoverImageUrl' : ''}`}>
                        <div className="NodeCardTitle">
                            <Link
                                className="Link"
                                component={RouterLink}
                                to={`/nodes/${node.rootId}/${node.id}`}
                            >
                                <Typography
                                    variant="h5"
                                    variantMapping={{ h5: 'h2' }}
                                    color="texts.primary"
                                    fontWeight="bold"
                                >
                                    {node.title}
                                </Typography>

                            </Link>
                            <Chip
                                variant="outlined"
                                color="primary"
                                label={node.isRoot ? 'Root' : 'Descendant'}
                            />
                        </div>
                        {
                            node.shortDescription
                            && (
                                <Typography variant="body2" color="texts.secondary" mt={2}>
                                    {node.shortDescription}
                                </Typography>
                            )
                        }
                    </CardContent>
                    <NodeCardActions node={node} />
                </Card>
            </Box>
        </Box>

    );
}
