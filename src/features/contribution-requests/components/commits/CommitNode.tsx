import { NodecosmosTheme } from '../../../../themes/themes.types';
import { AppNode } from '../../../nodes/nodes.types';
import { NODE_BUTTON_HEIGHT } from '../../../workflows/constants';
import useNavigateToNode from '../../hooks/useNavigateToNode';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ButtonBase, Tooltip, useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
    node: AppNode;
}

function CommitNode({ node }: Props) {
    const theme: NodecosmosTheme = useTheme();
    const navigateToNode = useNavigateToNode(node.id);

    const style = useMemo(() => {
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        const nestedTreeColor = backgrounds[(node.ancestorIds?.length || 0) % backgroundCount];

        return {
            border: '1px solid',
            borderColor: nestedTreeColor.fg,
            backgroundColor: nestedTreeColor.bg,
            height: NODE_BUTTON_HEIGHT,
            color: nestedTreeColor.fg,
        };
    }, [node.ancestorIds?.length, theme.palette.tree]);

    if (!node) {
        return null;
    }

    return (
        <Tooltip title="Go to Node">
            <ButtonBase
                type="button"
                className="NodeButton"
                style={style}
                onClick={navigateToNode}
            >
                <FontAwesomeIcon icon={faHashtag} />
                <div className="NodeButtonText">
                    {node.title}
                </div>
            </ButtonBase>
        </Tooltip>
    );
}

export default React.memo(CommitNode);
