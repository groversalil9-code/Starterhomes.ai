import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/Contact';

test('renders Contact page', () => {
  render(<Contact />);
  const headingElement = screen.getByText(/Contact Us/i);
  expect(headingElement).toBeInTheDocument();
});