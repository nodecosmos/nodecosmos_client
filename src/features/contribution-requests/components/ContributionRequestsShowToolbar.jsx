import React, { useEffect, useState } from 'react';
import {
  Tab, Tabs,
} from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagramNested } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

export default function ContributionRequestsShowToolbar({ nodeId }) {
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      visibleScrollbar
    >
      <Tab
        disableRipple
        iconPosition="start"
        icon={<FontAwesomeIcon icon={faDiagramNested} />}
        label="Commits"
        LinkComponent={Link}
        to="."
        index={0}
      />
      <Tab
        disableRipple
        iconPosition="start"
        icon={<FontAwesomeIcon icon={faDiagramNested} />}
        label="Tree"
        LinkComponent={Link}
        to="tree"
        index={1}
      />
      <Tab
        disableRipple
        iconPosition="start"
        icon={<FontAwesomeIcon icon={faDiagramNested} />}
        label="Workflow"
        LinkComponent={Link}
        to="workflow"
        index={2}
      />
    </Tabs>
  );
}

ContributionRequestsShowToolbar.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
