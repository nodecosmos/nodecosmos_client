import * as React from 'react';
import {
  Badge, Chip, IconButton, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
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
    date: '2022-04-14 7:20',
    comments: 42,
    avatar: '(⌐■_■)',
    chips: (
      <>
        <Chip
          size="small"
          label="components"
          sx={{
            border: '1px solid',
            borderColor: 'background.labels.green',
            color: 'background.labels.green',
            width: 'fit-content',
          }}
        />
        <Chip
          size="small"
          label="node "
          sx={{
            border: '1px solid',
            borderColor: 'background.labels.red',
            color: 'background.labels.red',
            width: 'fit-content',
            mt: 0.6,
          }}
        />
      </>
    ),
  },
  {
    username: 'superuser',
    topic: 'Change workflow',
    date: '2022-05-16 01:00',
    comments: 100,
    avatar: '( ͡~ ᴗ ͡°)',
    chips: (
      <Chip
        size="small"
        label="workflow"
        sx={{
          border: '1px solid',
          borderColor: 'background.labels.blue',
          color: 'background.labels.blue',
          width: 'fit-content',
        }}
      />
    ),
  },
  {
    username: 'contributor',
    topic: 'Feature suggestions',
    date: '2022-09-26 17:00',
    comments: 54,
    avatar: '( ͡❛ ͜ʖ ͡❛)',
    chips: (
      <Chip
        size="small"
        label="feature"
        sx={{
          border: '1px solid',
          borderColor: 'background.labels.green',
          color: 'background.labels.green',
          width: 'fit-content',
        }}
      />
    ),
  },
  {
    username: 'investor',
    topic: 'Commercial support',
    date: '2022-12-16 10:00',

    comments: 12,
    avatar: '(₿_₿)',
    chips: (
      <>
        <Chip
          size="small"
          label="investments"
          sx={{
            border: '1px solid',
            borderColor: 'background.labels.blue',
            color: 'background.labels.blue',
            width: 'fit-content',
          }}
        />
        <Chip
          size="small"
          label="tokens "
          sx={{
            border: '1px solid',
            borderColor: 'background.labels.purple',
            color: 'background.labels.purple',
            width: 'fit-content',
            mt: 0.6,
          }}
        />
      </>
    ),
  },
  {
    username: 'marketer',
    topic: 'Get customers',
    date: '2022-12-16 20:30',

    comments: 42,
    avatar: '(O_o)',
    chips: (
      <>
        <Chip
          size="small"
          label="marketing"
          sx={{
            border: '1px solid',
            borderColor: 'background.labels.greenTwo',
            color: 'background.labels.greenTwo',
            width: 'fit-content',
          }}
        />
        <Chip
          size="small"
          label="social "
          sx={{
            border: '1px solid',
            borderColor: 'background.labels.purple',
            color: 'background.labels.purple',
            width: 'fit-content',
            mt: 0.6,
          }}
        />
      </>
    ),
  },
];

export default function Topics() {
  return (
    <TableContainer>
      <Table
        aria-label="table"
        sx={{
          borderTop: '1px solid #454b53',
          borderBottom: '1px solid #454b53',
        }}
      >
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.username}
              sx={{
                borderRadius: 2,
                'td, th': {
                  mt: 1,
                  borderBottom: '1px solid #454b53',
                  borderRight: '1px solid #454b53',
                  p: '12px 16px',
                },
                'td:last-of-type': { borderRight: 0 },
                '&:last-of-type td': { borderBottom: 0 },
                '&:hover': {
                  backgroundColor: 'rgba(71,83,104,0.3)',
                },
              }}
            >
              <TableCell>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="start"
                >
                  <NodeAvatar user={{ username: row.username }} />
                  <Box ml={1}>
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontSize={{
                        xs: 10,
                        sm: 14,
                      }}
                    >
                      {row.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="left"
                      color="text.tertiary"
                      fontSize={{
                        xs: 8,
                        sm: 12,
                      }}
                    >
                      {row.date}
                    </Typography>
                  </Box>

                </Box>
              </TableCell>
              <TableCell align="left" size="small">
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    fontSize={{
                      xs: 10,
                      sm: 14,
                    }}
                    textAlign="left"
                    width={{
                      xs: 75,
                      sm: 150,
                    }}
                  >
                    {row.topic}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    flexDirection="column"
                    alignItems="start"
                    width={80}
                  >
                    {row.chips}
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="left">
                <IconButton>
                  <Badge
                    sx={{
                      color: 'text.secondary',
                      '.MuiBadge-badge': {
                        backgroundColor: 'background.badge',
                        color: 'text.badge',
                      },
                    }}
                    badgeContent={row.comments}
                  >
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
