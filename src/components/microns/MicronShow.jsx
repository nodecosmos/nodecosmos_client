import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* material ui */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
/* micro */
import { showMicron } from '../../actions';
import Header from '../header/Header';
import MicronShowSidebar from '../MicronShowSidebar';
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
          <MicronShowSidebar micron={micron} />
        </Grid>
        <Grid item xs={6} sm={10} height={1}>
          <Header />
          <Box mt={3}>
            <Route exact path="/microns/:id">
              <Container maxWidth="md">
                {micron.description}
              </Container>
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
