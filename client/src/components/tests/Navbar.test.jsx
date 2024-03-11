/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../Navbar';

const mockSetSortCriteria = vi.fn();
const mockSetFilterCriteria = vi.fn();

const renderComponent = () => {
  return render(
    <ChakraProvider>
      <Navbar
        setSortCriteria={mockSetSortCriteria}
        setFilterCriteria={mockSetFilterCriteria}
      />
    </ChakraProvider>,
  );
};

describe.only('Navbar', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('sort options trigger setSortCriteria', async () => {
    renderComponent();

    const sortMenu = screen.getByRole('button', { name: 'Sort' });
    fireEvent.click(sortMenu); // Open the sort menu

    await waitFor(() => {
      const alphabeticalOption = screen.getByText('Alphabetic');
      fireEvent.click(alphabeticalOption);
    });

    expect(mockSetSortCriteria).toHaveBeenCalledWith('alphabetical');
  });

  test('filter options trigger setFilterCriteria', async () => {
    renderComponent();

    const filterMenu = screen.getByRole('button', { name: 'Filter' });
    fireEvent.click(filterMenu); // Open the filter menu

    await waitFor(() => {
      const activeSubscriptionsOption = screen.getByText(
        'Active Subscriptions',
      );
      fireEvent.click(activeSubscriptionsOption);
    });

    expect(mockSetFilterCriteria).toHaveBeenCalledWith('active');
  });
});
