import React, { useCallback, useEffect } from 'react';
import {
  Box, IconButton, TextField, Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import useDebounce from '../hooks/useDebounce';
import nodecosmos from '../../apis/nodecosmos-server';
import ToolsContainer from './tools/ToolsContainer';

export default function EditTitleFieldInput({
  title, onChange, onClose, endpoint, reqData,
}) {
  const [value, setValue] = React.useState(title);
  const [shouldClose, setShouldClose] = React.useState(false);
  const inputRef = React.useRef(null);

  const storeTitle = useCallback(async () => {
    const response = await nodecosmos.put(endpoint, { ...reqData, title: value });

    return response.data;
  }, [endpoint, reqData, value]);

  const { debounce, inProgress } = useDebounce(storeTitle);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    debounce(newValue);
  };

  const handleClose = () => { setShouldClose(true); };

  useEffect(() => { inputRef.current.focus(); }, []);
  useEffect(() => {
    if (!inProgress && shouldClose) {
      onChange(value);
      onClose();
    }
  }, [onClose, onChange, shouldClose, value, inProgress]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        inputRef={inputRef}
        sx={{
          width: '350px',
          '.MuiInputBase-root': {
            borderColor: 'transparent',
            height: 32,
            borderRadius: 1,
            pl: 0.5,
          },
        }}
        variant="outlined"
        focused
        value={value}
        onChange={handleChange}
        onBlur={handleClose}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleClose();
          }
        }}
      />
      {inProgress && shouldClose && <CircularProgress size={20} sx={{ ml: 1, color: 'toolbar.green' }} /> }

      {!shouldClose && (
        <ToolsContainer>
          <Tooltip title="Save title" placement="top">
            <IconButton
              className="Item"
              onClick={handleClose}
              aria-label="Save title"
              sx={{ ml: 1, color: 'toolbar.green' }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </IconButton>
          </Tooltip>
        </ToolsContainer>
      )}
    </Box>
  );
}

EditTitleFieldInput.defaultProps = {
  reqData: {},
};

EditTitleFieldInput.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  endpoint: PropTypes.string.isRequired,
  reqData: PropTypes.object,
};
