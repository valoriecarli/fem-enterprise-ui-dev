import type { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type RenderOptions = Parameters<typeof renderComponent>[1];

export * from '@testing-library/react';

export const render = (
  ui: React.ReactElement,
  options?: Parameters<typeof renderComponent>[1],
) => {
  const user = userEvent.setup();
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};
