import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders Home page', () => {
  render(<Home />);
  const headingElement = screen.getByText(/Starterhomes\.ai/i);
  expect(headingElement).toBeInTheDocument();
});