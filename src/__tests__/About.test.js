import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('renders About page', () => {
  render(<About />);
  const headingElement = screen.getByText(/About Us/i);
  expect(headingElement).toBeInTheDocument();
});