import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Rent from '../pages/Rent';

// Mock recharts to avoid SVG rendering issues in tests
jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

test('renders Rent page with heading', () => {
  render(<Rent />);
  const headingElement = screen.getByText(/Premium Rentals/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders rental listing cards', () => {
  render(<Rent />);
  const austinRental = screen.getByText(/Austin, TX/i);
  expect(austinRental).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<Rent />);
  const searchInput = screen.getByPlaceholderText(/Search by location or keywords/i);
  expect(searchInput).toBeInTheDocument();
});

test('search filters listings by location', () => {
  render(<Rent />);
  const searchInput = screen.getByPlaceholderText(/Search by location or keywords/i);
  fireEvent.change(searchInput, { target: { value: 'Austin' } });
  expect(screen.getByText(/Austin, TX/i)).toBeInTheDocument();
  expect(screen.queryByText(/Denver, CO/i)).not.toBeInTheDocument();
});

test('search filters listings by description keyword', () => {
  render(<Rent />);
  const searchInput = screen.getByPlaceholderText(/Search by location or keywords/i);
  fireEvent.change(searchInput, { target: { value: 'mountain' } });
  expect(screen.getByText(/Denver, CO/i)).toBeInTheDocument();
  expect(screen.queryByText(/Austin, TX/i)).not.toBeInTheDocument();
});

test('clicking a listing shows detail view with tabs', () => {
  render(<Rent />);
  const austinCard = screen.getByText(/Austin, TX/i);
  fireEvent.click(austinCard);
  expect(screen.getByText(/Back to rentals/i)).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Overview/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Rental Details/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Rent Trends/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Affordability Calculator/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Neighborhood/i })).toBeInTheDocument();
});

test('Overview tab shows property stats', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  expect(screen.getByText('Year Built')).toBeInTheDocument();
  expect(screen.getByText('1998')).toBeInTheDocument();
});

test('Rental Details tab shows lease info', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByRole('tab', { name: /Rental Details/i }));
  expect(screen.getByText(/Lease Term/i)).toBeInTheDocument();
  expect(screen.getByText(/Security Deposit/i)).toBeInTheDocument();
  expect(screen.getByText(/Pet Policy/i)).toBeInTheDocument();
  expect(screen.getByText(/Room Breakdown/i)).toBeInTheDocument();
});

test('Rent Trends tab shows chart area', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByRole('tab', { name: /Rent Trends/i }));
  expect(screen.getByText(/Rent Trend Analysis/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Rent Projection/i)).toBeInTheDocument();
});

test('Affordability Calculator tab shows inputs and ratio', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByRole('tab', { name: /Affordability Calculator/i }));
  expect(screen.getByTestId('income-input')).toBeInTheDocument();
  expect(screen.getByTestId('rent-input')).toBeInTheDocument();
  expect(screen.getByTestId('ratio-display')).toBeInTheDocument();
  expect(screen.getByText(/Rent-to-Income Ratio/i)).toBeInTheDocument();
});

test('Affordability Calculator updates ratio on input change', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByRole('tab', { name: /Affordability Calculator/i }));
  const incomeInput = screen.getByTestId('income-input');
  fireEvent.change(incomeInput, { target: { value: '5000' } });
  // $2450 / $5000 = 49%, should show "High"
  expect(screen.getByText(/High/i)).toBeInTheDocument();
});

test('Neighborhood tab shows scores and schools', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByRole('tab', { name: /Neighborhood/i }));
  expect(screen.getByText(/Walk Score/i)).toBeInTheDocument();
  expect(screen.getByText(/Transit Score/i)).toBeInTheDocument();
  expect(screen.getByText(/Bike Score/i)).toBeInTheDocument();
  expect(screen.getByText(/Nearby Schools/i)).toBeInTheDocument();
  expect(screen.getByText(/Austin Elementary/i)).toBeInTheDocument();
});

test('detail view shows sidebar CTA buttons', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  expect(screen.getByText(/Schedule a Tour/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact Landlord/i)).toBeInTheDocument();
  expect(screen.getByText(/Starterhomes AI Network/i)).toBeInTheDocument();
});

test('back button returns to listing view', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  expect(screen.getByText(/Back to rentals/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Back to rentals/i));
  expect(screen.getByText(/Premium Rentals/i)).toBeInTheDocument();
});

// --- Modal Form Tests ---

test('Schedule a Tour button opens tour modal with form fields', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Schedule a Tour/i));
  expect(screen.getByTestId('tour-form')).toBeInTheDocument();
  expect(screen.getByText(/Preferred Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Preferred Time/i)).toBeInTheDocument();
});

test('Contact Landlord button opens contact modal with form fields', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Contact Landlord/i));
  expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
});

test('Tour form shows validation errors on empty submit', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Schedule a Tour/i));
  fireEvent.click(screen.getByRole('button', { name: /Schedule Tour/i }));
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByText('Phone is required')).toBeInTheDocument();
  expect(screen.getByText('Preferred date is required')).toBeInTheDocument();
  expect(screen.getByText('Preferred time is required')).toBeInTheDocument();
});

test('Contact form shows validation errors on empty submit', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Contact Landlord/i));
  fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByText('Phone is required')).toBeInTheDocument();
  expect(screen.getByText('Message is required')).toBeInTheDocument();
});

test('Tour form shows success on valid submit', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Schedule a Tour/i));
  const form = screen.getByTestId('tour-form');
  const inputs = form.querySelectorAll('input');
  fireEvent.change(inputs[0], { target: { value: 'John Doe' } });
  fireEvent.change(inputs[1], { target: { value: 'john@example.com' } });
  fireEvent.change(inputs[2], { target: { value: '555-1234' } });
  fireEvent.change(inputs[3], { target: { value: '2026-03-15' } });
  fireEvent.change(form.querySelector('select'), { target: { value: 'morning' } });
  fireEvent.click(screen.getByRole('button', { name: /Schedule Tour/i }));
  expect(screen.getByTestId('tour-success')).toBeInTheDocument();
  expect(screen.getByText('Tour Scheduled!')).toBeInTheDocument();
});

test('Contact form shows success on valid submit', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Contact Landlord/i));
  const form = screen.getByTestId('contact-form');
  const inputs = form.querySelectorAll('input');
  fireEvent.change(inputs[0], { target: { value: 'Jane Doe' } });
  fireEvent.change(inputs[1], { target: { value: 'jane@example.com' } });
  fireEvent.change(inputs[2], { target: { value: '555-5678' } });
  fireEvent.change(form.querySelector('textarea'), { target: { value: 'I am interested in this rental.' } });
  fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));
  expect(screen.getByTestId('contact-success')).toBeInTheDocument();
  expect(screen.getByText('Message Sent!')).toBeInTheDocument();
});

test('Modal closes when X button is clicked', () => {
  render(<Rent />);
  fireEvent.click(screen.getByText(/Austin, TX/i));
  fireEvent.click(screen.getByText(/Schedule a Tour/i));
  expect(screen.getByTestId('tour-form')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('modal-close'));
  expect(screen.queryByTestId('tour-form')).not.toBeInTheDocument();
});
