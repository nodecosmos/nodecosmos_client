import {
  Badge, IconButton, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import NodeAvatar from '../../../app/components/NodeAvatar';

const rows = [
  {
    username: 'nodemaster',
    topic: 'Discuss components',
    date: '2022-04-14 12:30',
    bgColor: '#a37dfc',
    comments: 42,
  },
  {
    username: 'superuser',
    topic: 'Change workflow',
    date: '2022-05-16 00:30',
    bgColor: '#f44336',
    comments: 100,
  },
  {
    username: 'contributor',
    topic: 'Feature suggestions',
    date: '2022-09-26 17:30',
    bgColor: '#a37dfc',
    comments: 54,
  },
  {
    username: 'investor',
    topic: 'Commercial support',
    date: '2022-12-16 12:30',
    bgColor: '#f44336',
    comments: 12,
  },
  {
    username: 'marketer',
    topic: 'Get customers',
    date: '2022-12-16 11:30',
    bgColor: '#a37dfc',
    comments: 42,
  },
];

export default function Topics() {
  return (
    <TableContainer>
      <Table aria-label="table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.username}
              sx={{
                borderRadius: 2,
                cursor: 'pointer',
                'td, th': {
                  mt: 1,
                  borderBottom: '1px solid #3c434f',
                  borderRight: '1px solid #3c434f',
                },
                '&:first-of-type td:first-of-type': { borderTopLeftRadius: 8 },
                '&:first-of-type td:last-of-type': { borderTopRightRadius: 8 },
                '&:last-of-type td:first-of-type': { borderBottomLeftRadius: 8 },
                '&:last-of-type td:last-of-type': { borderBottomRightRadius: 8 },
                'td:last-of-type': { borderRight: 0 },
                '&:last-of-type td': { borderBottom: 0 },
                '&:nth-of-type(odd)': {
                  backgroundColor: '#353941',
                },
                '&:hover': {
                  backgroundColor: '#3a3f48',
                },
              }}
            >
              <TableCell>
                <Box
                  display="flex"
                  flexDirection={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <NodeAvatar
                    bgColor={row.bgColor}
                    user={{ username: row.username }}
                  />
                  <Box ml={{
                    xs: 0, sm: 3,
                  }}
                  >
                    <Typography
                      variant="body2"
                      textAlign={{
                        xs: 'center', sm: 'left',
                      }}
                    >
                      {row.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={{
                        xs: 'center', sm: 'left',
                      }}
                      color="#fdfff9"
                      fontSize={12}
                    >
                      {row.date}
                    </Typography>
                  </Box>

                </Box>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{row.topic}</Typography>
              </TableCell>
              <TableCell align="left">
                <IconButton>
                  <Badge badgeContent={row.comments} color="secondary">
                    <ChatBubbleRoundedIcon />
                  </Badge>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
