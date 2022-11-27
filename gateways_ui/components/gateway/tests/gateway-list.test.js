import { screen, waitFor, fireEvent } from '@testing-library/react';
import GatewayList from '../gateway-list';
import '@testing-library/jest-dom';
import { customRender } from '../../../test-utils';

const gateways = [
  {
    _id: '63837d50d38e7ae0d177a1d9',
    serialNumber: '2',
    name: '2',
    ipV4: '255.255.255.2',
    devices: [],
  },
  {
    _id: '63837d50d38e7ae0d177a2d9',
    serialNumber: '223',
    name: 'Maxekk',
    ipV4: '255.255.10.2',
    devices: [],
  },
];

describe('<GatewayList>', () => {
  it('should render all gateways', async () => {
    const component = customRender(<GatewayList gateways={gateways} />);

    waitFor(() => {
      gateways.forEach((gateway) => {
        expect(component.queryByTestId(gateways._id)).toBeInTheDocument();
      });
    });
  });

  it('should open modal create gateway', async () => {
    const component = customRender(<GatewayList gateways={gateways} />);
    const createButton = component.getByTestId('button-create-gateway');
    fireEvent.click(createButton);

    waitFor(() => {
      expect(
        component.queryByTestId('modal-create-gateway')
      ).toBeInTheDocument();
    });
  });
});
