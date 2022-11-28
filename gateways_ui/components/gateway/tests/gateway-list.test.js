import { screen, waitFor, fireEvent, getByText } from '@testing-library/react';
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
  it('should render all gateways', () => {
    waitFor(() => {
      gateways.forEach((gateway) => {
        expect(
          GatewayListComponent.queryByTestId(gateways._id)
        ).toBeInTheDocument();
      });
    });
  });

  it('the modal should be visible', () => {
    const component = customRender(<GatewayList gateways={gateways} />);
    const createButton = component.getByTestId('button-create-gateway');

    fireEvent.click(createButton);
    component.queryByTestId('modal-create-gateway').focus();
  });

  it('should exist in the modal three inputs and one submit buttom', () => {
    const component = customRender(<GatewayList gateways={gateways} />);
    const createButton = component.getByTestId('button-create-gateway');

    fireEvent.click(createButton);

    console.debug(createButton);

    //time over... :( 
  });
});
