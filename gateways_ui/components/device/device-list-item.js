import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

import { useSnackbar } from 'notistack';

function DeviceItems(props) {
  let _status = '';
  let _createAt = '';

  const { enqueueSnackbar } = useSnackbar();

  const { _id, uid, createAt, vendor, status, callBack_DelDevice } = props;

  const handleDelete = async () => {
    try {
      const response = await axios({
        url: `http://localhost:3000/device/${_id}`,
        method: 'DELETE',
      });
      callBack_DelDevice(response.data);
      enqueueSnackbar('Device Unmounted!', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: 'error',
      });
    }
  };

  status ? (_status = 'Running') : (_status = 'Stopped');
  _createAt = createAt.split('T')[0];

  return (
    <ListItem
      sx={{
        width: '100%',
        my: 1,
        px: 0,
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
        <ListItemText primary={`Uid Nº:`} />
        <ListItemText primary={` ${uid}`} />
      </Box>{' '}
      <Box sx={{ mx: 2 }}>
        <ListItemText primary={`Vendor:`} />
        <ListItemText primary={` ${vendor}`} />
      </Box>
      <Box sx={{ mx: 2 }}>
        <ListItemText primary={`CreateAt:`} />
        <ListItemText primary={`${_createAt}`} />
      </Box>
      <Box sx={{ mx: 2 }}>
        <ListItemText primary={`Status:`} />
        <ListItemText primary={`${_status}`} />
      </Box>
      <Tooltip title="Delete device">
        <Button
          sx={{
            color: '#65A3DF',
            mx: 2,
            '&:hover': {
              border: '2px #074787 solid',
              color: 'tomato',
              backgroundColor: '#1A77D1',
              opacity: [0.9, 0.8, 0.9],
            },
          }}
          onClick={handleDelete}
        >
          <DeleteOutlineIcon />
        </Button>
      </Tooltip>
    </ListItem>
  );
}

export default DeviceItems;
