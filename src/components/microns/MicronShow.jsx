import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import { Typography, Grid } from '@mui/material';
/* micro */
import { showMicron } from '../../actions';
import Header from '../header/Header';
import Sidebar from './show/Sidebar';
import MainPage from './show/MainPage';
import CreateMicron from './CreateMicron';

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
        <Grid item xs={6} sm={2} className="BoxShadowRight">
          <Box padding={2} height={54}>
            <Typography align="center" variant="h5">
              <Link to={`/user/${micron.owner.username}`}>
                {micron.owner.username}
              </Link>
              /
              {micron.title.toLowerCase()}
            </Typography>
          </Box>
          <Sidebar micron={micron} />
        </Grid>
        <Grid item xs={6} sm={10} height={1}>
          <Header />
          <Box height={1}>
            <Route exact path="/microns/:id">
              <MainPage micron={micron} />
            </Route>
            <Route path="/microns/:id/new" component={CreateMicron} />
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
