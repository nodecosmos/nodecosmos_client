/* mui */
import TreeNodes from './TreeNodes';
import TreeShowToolbar from './TreeShowToolbar';
import Alert from '../../../common/components/Alert';
import OverlayLoader from '../../../common/components/OverlayLoader';
import Transformable from '../../../common/components/Transformable';
import { HEADER_HEIGHT } from '../../app/constants';
import { useTreeContextCreator } from '../hooks/useTreeContext';
import { TREES_TYPES } from '../trees.constants';
import { selectIsTreeLoading } from '../trees.selectors';
import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Tree({
    rootNodeId, type, onChange, value,
}) {
    const { TreeContext, contextProviderValue } = useTreeContextCreator({
        type, onChange, value, rootNodeId,
    });

    const isTreeLoading = useSelector(selectIsTreeLoading);

    return (

        <TreeContext.Provider value={contextProviderValue}>
            <div className="Tree">
                <TreeShowToolbar rootNodeId={rootNodeId} />
                <Alert />
                <Box position="relative" height={`calc(100% - ${HEADER_HEIGHT})`}>
                    {isTreeLoading ? <OverlayLoader /> : null}
                    <Transformable transformableId={rootNodeId}>
                        <TreeNodes rootNodeId={rootNodeId} type={type} />
                    </Transformable>
                </Box>
            </div>
        </TreeContext.Provider>
    );
}

Tree.defaultProps = {
    type: TREES_TYPES.default,
    onChange: null,
    value: null,
};

Tree.propTypes = {
    rootNodeId: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.array,
};
