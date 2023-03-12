import React from 'react';
import { faRectangleCode, faAlignJustify, faCodeCommit } from '@fortawesome/pro-solid-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';

import { selectNodeDetailsAction } from '../../nodes.selectors';
import { setNodeDetailsAction } from '../../nodesSlice';

export default function NodeDetailsToolbar(props) {
  const { id } = props;

  const dispatch = useDispatch();
  const nodeDetailsAction = useSelector(selectNodeDetailsAction);

  if (!id) return <div />; // empty div for flexbox alignment

  return (
    <ToolbarContainer>
      <ToolbarItem
        title="Edit Description Markdown"
        icon={faRectangleCode}
        color="toolbar.lightRed"
        active={nodeDetailsAction === 'markdownEditor'}
        onClick={() => dispatch(setNodeDetailsAction('markdownEditor'))}
      />
      <ToolbarItem
        title="View Description"
        icon={faAlignJustify}
        color="toolbar.green"
        active={nodeDetailsAction === 'description'}
        onClick={() => dispatch(setNodeDetailsAction('description'))}
      />
      <ToolbarItem
        title="Workflow"
        icon={faCodeCommit}
        color="toolbar.blue"
        active={nodeDetailsAction === 'workflow'}
        onClick={() => dispatch(setNodeDetailsAction('workflow'))}
      />
    </ToolbarContainer>
  );
}

NodeDetailsToolbar.defaultProps = {
  id: null,
};

NodeDetailsToolbar.propTypes = {
  id: PropTypes.string,
};
