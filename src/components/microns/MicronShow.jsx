import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import { Grid } from '@mui/material';
/* micro */
import { setSubtitle, setCurrentToolbar, showMicron } from '../../actions';
import Sidebar from './show/Sidebar';
import Micron from './show/tabs/Micron';
import Tree from './show/tabs/Tree';

export default function MicronShow() {
  const microns = useSelector((state) => state.microns);
  const dispatch = useDispatch();

  const { id } = useParams();
  const micron = microns[id];

  useEffect(() => {
    dispatch(showMicron(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!micron) return null;

  dispatch(setCurrentToolbar('MicronShowToolbar'));
  dispatch(setSubtitle(micron.title));

  return (
    <Box height={1}>
      <Grid container height={1}>
        <Grid item xs={6} sm={2} className="Sidebar BoxShadowRight BorderRight">
          <Sidebar micron={micron} />
        </Grid>
        <Grid item xs={6} sm={10} height={1}>
          <Box height={1}>
            <Route exact path="/microns/:id"><Micron micron={micron} /></Route>
            <Route path="/microns/:id/tree"><Tree micron={micron} /></Route>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={2} className="BoxShadowLeft" align="center"> */}
        {/*  <p>editors</p> */}
        {/*  <p>contributors</p> */}
        {/*  <p>embedded in microns</p> */}
        {/* </Grid> */}
      </Grid>
    </Box>
  );
}
