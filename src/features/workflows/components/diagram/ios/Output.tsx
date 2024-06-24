import OutputButton from './output/OutputButton';
import OutputToolbar from './output/OutputToolbar';
import OutputBranch from './OutputBranch';
import { UUID } from '../../../../../types';
import { selectInputOutput } from '../../../../input-outputs/inputOutputs.selectors';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import { Output as OutputType } from '../../../diagram/diagram.types';
import { useIoContextCreator } from '../../../hooks/diagram/io/useIoContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import React from 'react';
import { useSelector } from 'react-redux';

interface OutputProps {
    output: OutputType;
}

const G_STYLE = {
    opacity: 0,
    animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
};

export default function Output(props: OutputProps) {
    const { output } = props;
    const {
        id,
        position,
        nodeId: fsNodeId,
    } = output;
    const { xEnd } = position;
    const { IoContext, ioContextValue } = useIoContextCreator({
        id,
        fsNodeId: fsNodeId as UUID,
        position,
    });
    const { branchId } = useWorkflowContext();
    const io = useSelector(selectInputOutput(branchId, id));

    if (!xEnd || !io) return null;

    return (
        <g>
            <IoContext.Provider value={ioContextValue}>
                <OutputBranch output={output} />
                <g style={G_STYLE}>
                    <OutputToolbar />
                    <OutputButton />
                </g>
            </IoContext.Provider>
        </g>
    );
}
