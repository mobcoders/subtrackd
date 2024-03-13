/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import AddEditSubscriptionForm from '../AddEditSubscriptionForm';

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
    </ChakraProvider>,
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

  // ... (rest of the tests from the previous example)
});
