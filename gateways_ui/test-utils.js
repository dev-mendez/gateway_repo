import React from 'react';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';

const AllTheProviders = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
