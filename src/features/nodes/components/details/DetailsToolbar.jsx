import React from 'react';
import { faCodeCompare, faEye, faSquareCode } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { selectNodeDetailsAction } from '../../nodes.selectors';
import { setNodeDetailsAction } from '../../nodesSlice';

export default function DetailsToolbar(props) {
  const { id } = props;

  const dispatch = useDispatch();
  const nodeDetailsAction = useSelector(selectNodeDetailsAction);

  if (!id) return <div />; // empty div for flexbox alignment

  return (
    <ButtonGroup
      variant="contained"
      disableElevation
      disableRipple
      sx={{
        height: 1,
        '.MuiButtonGroup-grouped, .MuiButtonGroup-grouped:not(:last-of-type)': {
          backgroundColor: 'transparent',
          border: 'none',
          borderRight: 'none',
          transition: 'none',
          '&.active': {
            backgroundColor: 'toolbar.active',
          },
          '&:hover': {
            backgroundColor: 'toolbar.hover',
          },
        },
        svg: {
          fontSize: '1.25rem',
        },
      }}
    >
      <Tooltip title="Edit Description" placement="left">
        <Button
          size="large"
          className={`${nodeDetailsAction === 'markdownEditor' && 'active'}`}
          onClick={() => dispatch(setNodeDetailsAction('markdownEditor'))}
          aria-label="Edit Description"
          sx={{
            color: 'toolbar.default',
            '&:hover, &.active': { color: 'toolbar.red' },
          }}
        >
          <FontAwesomeIcon icon={faSquareCode} />
        </Button>
      </Tooltip>
      <Button
        size="large"
        className={`${nodeDetailsAction === 'description' && 'active'}`}
        onClick={() => dispatch(setNodeDetailsAction('description'))}
        aria-label="View Description"
        sx={{
          color: 'toolbar.default',
          '&:hover, &.active': { color: 'toolbar.green' },
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <Button
        size="large"
        className={`${nodeDetailsAction === 'workflow' && 'active'}`}
        onClick={() => dispatch(setNodeDetailsAction('workflow'))}
        aria-label="Workflow"
        sx={{
          color: 'toolbar.default',
          '&:hover, &.active': { color: 'toolbar.blue' },
        }}
      >
        <FontAwesomeIcon icon={faCodeCompare} />
      </Button>
    </ButtonGroup>
  );
}

DetailsToolbar.defaultProps = {
  id: null,
};

DetailsToolbar.propTypes = {
  id: PropTypes.string,
};
