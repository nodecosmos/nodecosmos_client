import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

/* nodes */
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import NodeTab from '../../../pages/nodes/show/NodeTab';
import TreeTab from '../../../pages/nodes/show/TreeTab';

/* users */
import UserAuthentication from '../../../pages/users/Authentication';
import useUserAuthentication from '../../authentication/hooks/useUserAuthentication';
/* nodecosmos */
import { HEADER_HEIGHT } from '../constants';
import Header from './header/Header';

export default function LazyAppLoad() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { syncUpCurrentUser } = useUserAuthentication();

  useEffect(() => {
    if (isAuthenticated) syncUpCurrentUser();
  }, [isAuthenticated, syncUpCurrentUser]);

  return (
    <Box
      borderRadius={{
        xs: 0,
        sm: 2,
      }}
      height={1}
      overflow="auto"
      border={1}
      borderColor="borders.2"
    >
      <Header />
      <Box height={1} pt={`${HEADER_HEIGHT}px`}>
        <Routes>
          <Route path="/n" element={(<NodesIndex />)} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to={`/users/${currentUser.username}`} /> : <UserAuthentication />
            }
          />
          <Route path="/nodes/:id/" element={<NodeShow />}>
            <Route index element={<NodeTab />} />
            <Route path="tree" element={<TreeTab />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}
