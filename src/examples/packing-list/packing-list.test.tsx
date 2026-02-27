import { render as _render, screen } from 'test/utilities';
import PackingList from '.';
import userEvent from '@testing-library/user-event';
import { createStore } from './store';
import { Provider } from 'react-redux';

const render = (ui: React.ReactElement) => {
  return _render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
};

it('renders the Packing List application', () => {
  render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
});

it('has the correct title', async () => {
  render(<PackingList />);
  // screen.getByText('Packing List');
  const header = screen.getByRole('heading', { level: 1 });
  expect(header).toHaveTextContent('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  render(<PackingList />);
  const inputField = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: /add new item/i });

  expect(inputField).toHaveValue('');
  expect(newItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const inputField = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: /add new item/i });

  await user.type(inputField, 'new item');
  expect(newItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const inputField = screen.getByLabelText('New Item Name');
  const newItemButton = screen.getByRole('button', { name: /add new item/i });

  const unpackedItemList = screen.getByTestId('unpacked-items-list');
  await user.type(inputField, 'stuff');
  await user.click(newItemButton);
  expect(screen.getByLabelText('stuff')).not.toBeChecked();
  // expect(inputField).toHaveValue('');
});

it('allows the removal of an unpacked item', async () => {
  const { user } = render(<PackingList />);
  const inputField = screen.getByLabelText('New Item Name');

  const newItemButton = screen.getByRole('button', { name: /add new item/i });

  await user.type(inputField, 'mario bros');
  await user.click(newItemButton);

  const removeItem = await screen.findByLabelText('Remove mario bros');
  await user.click(removeItem);
});
