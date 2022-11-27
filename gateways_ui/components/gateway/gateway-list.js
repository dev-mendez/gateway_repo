import GatewayItem from './gateway-list-item';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddGatewayForm from './add-gateway-form';
import { useState } from 'react';
import EmptyListMessage from '../ui/common/empty-list-message';

function GatewayList({ gateways: gatewayList }) {
  
  const [gateways, setGateway] = useState(gatewayList);

  const callBackGateway = (gateway) => {
    setGateway([gateway.newGateway, ...gateways]);
  };

  return (
    <>
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
          Gateways
        </Typography>
        <AddGatewayForm callBackGateway={callBackGateway} />
      </Box>
      <hr />
      {gateways.length > 0 ? (
        <Box>
          <List
            sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {gateways.map((gateway) => (
              <GatewayItem key={gateway._id} {...gateway} />
            ))}
          </List>
        </Box>
      ) : (
        <EmptyListMessage />
      )}
    </>
  );
}

export default GatewayList;
