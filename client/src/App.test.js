import { render, screen } from '@testing-library/react';
import App from './App';

test('renders check-in form', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
});
