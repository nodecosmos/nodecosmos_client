import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import EditTitleFieldInput from './EditTitleFieldInput';

export default function EditTitleField({
  title,
  color,
  pr,
  variant,
  endpoint,
  onChange,
  reqData,
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const onClose = useCallback(() => setIsEditing(false), [setIsEditing]);

  if (isEditing) {
    return (
      <EditTitleFieldInput
        title={title}
        onChange={onChange}
        onClose={onClose}
        endpoint={endpoint}
        reqData={reqData}
      />
    );
  }

  return (
    <Typography
      onClick={() => setIsEditing(true)}
      value={title}
      color={(title && color) || 'text.tertiary'}
      variant={variant}
      pr={pr}
      sx={{
        height: 1,
        display: 'table-cell',
        verticalAlign: 'middle',
        maxWidth: '350px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {title || 'Click to add title'}
    </Typography>
  );
}

EditTitleField.defaultProps = {
  color: 'text.secondary',
  pr: 0,
  variant: 'body2',
  onChange: () => {},
  reqData: {},
};

EditTitleField.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  color: PropTypes.string,
  pr: PropTypes.number,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  reqData: PropTypes.object,
};
