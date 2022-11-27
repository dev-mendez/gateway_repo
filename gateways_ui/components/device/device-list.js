import DeviceItem from './device-list-item';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddDeviceForm from './add-device-form';
import { useState } from 'react';
import List from '@mui/material/List';
import EmptyListMessage from '../ui/common/empty-list-message';

function DeviceList({ props }) {
  const [devices, setDevices] = useState(props.gateway.devices);

  const callBack_AddDevice = (device) => {
    setDevices([device.newDevice, ...devices]);
  };

  const callBack_DelDevice = (delDevice) =>
    setDevices([
      ...devices.filter((device) => device._id !== delDevice.deletedDevice._id),
    ]);

  return (
    <div>
      <Box
        sx={{
          width: '100%',

          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'grey',
            textDecoration: 'none',
          }}
        >
          Devices
        </Typography>
        <AddDeviceForm callBack_AddDevice={callBack_AddDevice} />
      </Box>
      <hr />
      {devices.length > 0 ? (
        <Box>
          <List
            sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {devices.map((device) => (
              <DeviceItem
                key={device._id}
                {...device}
                callBack_DelDevice={callBack_DelDevice}
              />
            ))}
          </List>
        </Box>
      ) : (
        <EmptyListMessage />
      )}
    </div>
  );
}

export default DeviceList;
