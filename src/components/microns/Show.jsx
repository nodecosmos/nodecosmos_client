import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import Box from '@mui/material/Box';
/* micro */
import { setSubtitle, setCurrentToolbar, showMicron } from '../../actions';
import Sidebar from './show/Sidebar';
import MicronTab from './show/tabs/MicronTab';
import Tree from './show/tabs/tree/Tree';
import TreeReference from './show/tabs/tree/Tree (just_for_reference)'; // TODO: remove this

export default function MicronShow() {
  const microns = useSelector((state) => state.microns);
  const dispatch = useDispatch();

  const { id } = useParams();
  const micron = microns[id];

  useEffect(() => {
    if (micron && micron.fetched) {
      dispatch(setSubtitle(micron.title));
    } else {
      dispatch(showMicron(id));
    }

    dispatch(setCurrentToolbar('MicronShowToolbar'));

    return () => {
      dispatch(setSubtitle(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!micron) return null;

  return (
    <Box height={1} display="flex">
      <Box width={300} height={1} className="BoxShadowRight BorderRight">
        <Sidebar micron={micron} />
      </Box>
      <Box height={1} width="calc(100% - 300px)">
        <Route exact path="/microns/:id"><MicronTab micron={micron} /></Route>
        <Route path="/microns/:id/tree"><Tree micron={micron} /></Route>
        <Route path="/microns/:id/reference"><TreeReference micron={micron} /></Route>
      </Box>
    </Box>
  );
}
