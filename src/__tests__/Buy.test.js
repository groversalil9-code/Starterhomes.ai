import React from 'react';
import { render, screen } from '@testing-library/react';
import Buy from '../pages/Buy';

test('renders Buy page', () => {
  render(<Buy />);
  const headingElement = screen.getByText(/Buy a Home/i);
  expect(headingElement).toBeInTheDocument();
});