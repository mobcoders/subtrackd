// AddEditSubscriptionForm.test.jsx
import React from 'react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import AddEditSubscriptionForm from './AddEditSubscriptionForm';
import apiService from '../services/apiService';

// Mock the apiService for testing purposes
vi.mock('../services/apiService');
const mockRefreshSubscriptions = vi.fn();
const mockOnClose = vi.fn();
const renderComponent = (props) => {
  return render(
    <ChakraProvider>
      <AddEditSubscriptionForm
        isOpen={true}
        onClose={mockOnClose}
        subscription={props.subscription}
        refreshSubscriptions={mockRefreshSubscriptions}
      />
    </ChakraProvider>
  );
};
describe('AddEditSubscriptionForm', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('renders form fields correctly for new subscription', () => {
    renderComponent({ subscription: undefined });
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Cost')).toBeInTheDocument();
    expect(screen.getByLabelText('Billing Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Suspend')).toBeInTheDocument();
  });
  test('renders form fields correctly for existing subscription', () => {
    const subscription = {
      name: 'Netflix',
      cost: 9,
      billingDate: new Date('2023-04-01'),
      endDate: new Date('2023-12-31'),
      isActive: true,
    };
    renderComponent({ subscription });
    expect(screen.getByLabelText('Name')).toHaveValue('Netflix');
    expect(screen.getByLabelText('Cost')).toHaveValue('9');
    expect(screen.getByLabelText('Billing Date')).toHaveValue('2023-04-01');
    expect(screen.getByRole('checkbox', { name: 'Suspend' })).toBeChecked();
  });
  test('adds a new subscription', async () => {
    const newSubscription = {
      name: 'Spotify',
      cost: 9,
      billingDate: new Date('2023-05-01'),
      isActive: true,
    };
    apiService.addSubscription.mockResolvedValueOnce(newSubscription);
    renderComponent({ subscription: undefined });
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Spotify' },
    });
    fireEvent.change(screen.getByLabelText('Cost'), {
      target: { value: '9' },
    });
    fireEvent.change(screen.getByLabelText('Billing Date'), {
      target: { value: '2023-05-01' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(apiService.addSubscription).toHaveBeenCalledWith(newSubscription)
    );
    expect(mockRefreshSubscriptions).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
  // test('updates an existing subscription', async () => {
  //   const subscription = {
  //     _id: '1234',
  //     name: 'Netflix',
  //     cost: 9,
  //     billingDate: new Date('2023-04-01'),
  //     endDate: new Date('2023-12-31'),
  //     isActive: true,
  //   };
  //   const updatedSubscription = {
  //     ...subscription,
  //     cost: 12,
  //     isActive: false,
  //   };
  //   apiService.updateSubscription.mockResolvedValueOnce(updatedSubscription);
  //   renderComponent({ subscription });
  //   fireEvent.change(screen.getByLabelText('Cost'), {
  //     target: { value: '12' },
  //   });
  //   fireEvent.click(screen.getByRole('checkbox', { name: 'Suspend' }));
  //   fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  //   await waitFor(() =>
  //     expect(apiService.updateSubscription).toHaveBeenCalledWith(
  //       '1234',
  //       updatedSubscription
  //     )
  //   );
  //   expect(mockRefreshSubscriptions).toHaveBeenCalled();
  //   expect(mockOnClose).toHaveBeenCalled();
  // });
  test('deletes an existing subscription', async () => {
    const subscription = {
      _id: '1234',
      name: 'Netflix',
      cost: 9,
      billingDate: new Date('2023-04-01'),
      endDate: new Date('2023-12-31'),
      isActive: true,
    };
    apiService.deleteSubscription.mockResolvedValueOnce(subscription);
    renderComponent({ subscription });
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(apiService.deleteSubscription).toHaveBeenCalledWith('1234')
    );
    expect(mockRefreshSubscriptions).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
