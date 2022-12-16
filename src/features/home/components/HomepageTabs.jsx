import React from 'react';
import {
  Drawer,
  IconButton,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

const tabSx = {
  ml: 1,
  fontSize: 15,
};

export default function HomepageTabs(props) {
  const { tab, handleTabChange } = props;
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const options = [
    'Innovate', 'Collaborate', 'Investments', 'Open Source', 'MVP', 'Contact Us',
  ];

  if (matchesSm) {
    return (
      <>
        <IconButton aria-label="delete" size="large" onClick={() => setOpen(!open)}>
          <MenuIcon fontSize="inherit" htmlColor="#e1dcce" />
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              pl: 0,
              pt: 0,
            },
          }}
        >
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(event, newValue) => {
              handleTabChange(event, newValue);
              setTimeout(() => setOpen(false), 500);
            }}
            TabIndicatorProps={{
              sx: {
                left: -1,
              },
            }}
            centered
          >
            {options.map((option) => <Tab label={option} disableRipple sx={tabSx} key={option} />)}
          </Tabs>
        </Drawer>
      </>
    );
  }

  return (
    <Tabs
      value={tab}
      onChange={handleTabChange}
      centered
      sx={{
        height: 1,
      }}
      TabIndicatorProps={{
        sx: {
          height: 10,
          top: 49,
        },
      }}
    >
      {options.map((option) => (
        <Tab
          label={option}
          disableRipple
          sx={tabSx}
          key={option}
        />
      ))}
    </Tabs>
  );
}

HomepageTabs.propTypes = {
  tab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};
