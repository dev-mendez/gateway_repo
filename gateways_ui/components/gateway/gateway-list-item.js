import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import LanIcon from '@mui/icons-material/Lan';

import Box from '@mui/material/Box';

import Router from 'next/router';

function GatewayItem(props) {
  const { _id, serialNumber, name, ipV4 } = props;
  return (
    <ListItem
      data-testid={_id}
      sx={{
        width: '100%',
        my: 2,
        border: '2px solid gray',
        backgroundColor: '#064887',
        '&:hover': {
          backgroundColor: 'primary.main',
          border: '2px #074787 solid',
        },
      }}
    >
      <ListItemAvatar sx={{ mx: 2 }}>
        <Image src="/gateway_app.gif" alt="device" width={50} height={50} />
      </ListItemAvatar>
      <Box sx={{ mx: 2 }}>
        <ListItemText primary={`Serial Nº:`} />
        <ListItemText primary={`${serialNumber}`} />
      </Box>
      <Box sx={{ mx: 2 }}>
        <ListItemText primary={`Name: `} />
        <ListItemText primary={`${name} `} />
      </Box>
      <Box sx={{ mx: 2 }}>
        <ListItemText primary={`IpV4:`} />
        <ListItemText primary={` ${ipV4}`} />
      </Box>

      <Tooltip title="Manage devices">
        <Button
          sx={{
            color: '#65A3DF',
            ml: 2,
            ml: 'auto',
            '&:hover': {
              border: '2px #074787 solid',
              color: 'white',
              backgroundColor: '#1A77D1',
              opacity: [0.9, 0.8, 0.9],
            },
          }}
          onClick={(e) => Router.push('/device/[id]', `device/${_id}`)}
        >
          <LanIcon />
        </Button>
      </Tooltip>
    </ListItem>
  );
}

export default GatewayItem;
