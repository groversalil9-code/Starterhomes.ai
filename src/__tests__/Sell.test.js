import React from 'react';
import { render, screen } from '@testing-library/react';
import Sell from '../pages/Sell';

test('renders Sell page', () => {
  render(<Sell />);
  const headingElement = screen.getByText(/Sell Your Home/i);
  expect(headingElement).toBeInTheDocument();
});