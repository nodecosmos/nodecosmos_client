import NodeCardActions from './NodeCardActions';
import NodeCardHeader from './NodeCardHeader';
import { UUID } from '../../../../types';
import { selectIndexedNode } from '../../nodes.selectors';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Link,
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
                        <Link
                            sx={{
                                '&:hover h2': {
                                    color: 'text.link',
                                    textDecoration: 'underline',
                                },
                            }}
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
                        {
                            node.shortDescription
                            && (
                                <Typography variant="body2" color="text.secondary" mt={2}>
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
