import React from 'react';
import { Hello } from './Hello';
import { render, screen } from '@testing-library/react';

it('should render hello world', () => {
  render(<Hello />);
  const element = screen.getByText(/hello world/);
  expect(element).toBeInTheDocument();
});
