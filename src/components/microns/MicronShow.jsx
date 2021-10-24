import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* material ui */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
/* micro */
import { showMicron } from '../../actions';
import MicronShowSidebar from '../MicronShowSidebar';

export default function MicronShow() {
  const microns = useSelector((state) => state.microns);
  const dispatch = useDispatch();

  const { id } = useParams();
  const micron = microns[id];

  useEffect(() => {
    dispatch(showMicron(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!micron) return null;

  return (
    <Box height={1}>
      <Grid container height={1}>
        <Grid item xs={6} sm={2} className="BoxShadowRight" align="center">
          <MicronShowSidebar micron={micron} />
        </Grid>
        <Grid item xs={6} sm={8} height={1} p={2}>
          <Typography variant="h5" align="center">
            <Link to={`/user/${micron.owner.username}`}>
              {micron.owner.username}
            </Link>
            /
            {micron.title.toLowerCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2} className="BoxShadowLeft" align="center">
          <p>editors</p>
          <p>contributors</p>
          <p>embedded in microns</p>
        </Grid>
      </Grid>
    </Box>
  );
}
