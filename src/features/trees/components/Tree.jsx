/* mui */
import React from 'react';
import * as PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Transformable from '../../../common/components/Transformable';
import { TREES_TYPES } from '../trees.constants';
import { useTreeContextCreator } from '../hooks/useTreeContext';
import Alert from '../../../common/components/Alert';
import { HEADER_HEIGHT } from '../../app/constants';
import OverlayLoader from '../../../common/components/OverlayLoader';
import { selectIsTreeLoading } from '../trees.selectors';
import TreeNodes from './TreeNodes';
import TreeContainer from './TreeContainer';
import TreeShowToolbar from './TreeShowToolbar';

export default function Tree({
    rootNodeId, type, onChange, value,
}) {
    const { TreeContext, contextProviderValue } = useTreeContextCreator({
        type, onChange, value, rootNodeId,
    });

    const isTreeLoading = useSelector(selectIsTreeLoading);

    return (

        <TreeContext.Provider value={contextProviderValue}>
            <TreeContainer>
                <TreeShowToolbar rootNodeId={rootNodeId} />
                <Alert />
                <Box position="relative" height={`calc(100% - ${HEADER_HEIGHT})`}>
                    {isTreeLoading && <OverlayLoader />}
                    <Transformable transformableId={rootNodeId}>
                        <TreeNodes rootNodeId={rootNodeId} type={type} />
                    </Transformable>
                </Box>
            </TreeContainer>
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
