import React from 'react';
import { faRectangleCode, faBracketsCurly } from '@fortawesome/pro-solid-svg-icons';
import { faCodeCompare } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { selectNodeDetailsAction } from '../../nodes.selectors';
import { setNodeDetailsAction } from '../../nodesSlice';

export default function NodeDetailsToolbar(props) {
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
        display: 'flex',
        alignItems: 'center',
        height: 1,
        '.MuiButtonGroup-grouped': {
          '&:not(:last-of-type), &:not(:first-of-type)': {
            width: 45,
            height: 45,
            ml: '5.5px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRight: 'none',
            transition: 'none',
            borderRadius: 1,
            '&.active': {
              backgroundColor: 'toolbar.active',
            },
            '&:hover': {
              backgroundColor: 'toolbar.hover',
            },
          },
        },
        svg: {
          fontSize: '1.25rem',
        },
      }}
    >
      <Tooltip title="Edit Description Markdown" placement="top">
        <Button
          size="large"
          className={`${nodeDetailsAction === 'markdownEditor' && 'active'}`}
          onClick={() => dispatch(setNodeDetailsAction('markdownEditor'))}
          sx={{
            color: 'toolbar.default',
            '&:hover, &.active': { color: 'toolbar.lightRed' },
            borderRadius: 0,
          }}
        >
          <FontAwesomeIcon icon={faRectangleCode} />
        </Button>
      </Tooltip>
      <Tooltip title="View Description" placement="top">
        <Button
          size="large"
          className={`${nodeDetailsAction === 'description' && 'active'}`}
          onClick={() => dispatch(setNodeDetailsAction('description'))}
          sx={{
            color: 'toolbar.default',
            '&:hover, &.active': { color: 'toolbar.green' },
            borderRadius: 0,
          }}
        >
          <FontAwesomeIcon icon={faBracketsCurly} />
        </Button>
      </Tooltip>
      <Tooltip title="Workflow" placement="top">
        <Button
          size="large"
          className={`${nodeDetailsAction === 'workflow' && 'active'}`}
          onClick={() => dispatch(setNodeDetailsAction('workflow'))}
          sx={{
            color: 'toolbar.default',
            '&:hover, &.active': { color: 'toolbar.blue' },
            borderRadius: 0,

          }}
        >
          <FontAwesomeIcon icon={faCodeCompare} />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

NodeDetailsToolbar.defaultProps = {
  id: null,
};

NodeDetailsToolbar.propTypes = {
  id: PropTypes.string,
};
