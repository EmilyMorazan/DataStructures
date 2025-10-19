import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders CodeReady header', () => {
    render(<App />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveTextContent(/CodeReady/i);
  });

  test('renders main navigation buttons', () => {
    render(<App />);
    const homeButton = screen.getByRole('button', { name: /Home/ });
    const dataStructuresButton = screen.getByRole('button', { name: /Data Structures/ });
    const algorithmsButton = screen.getByRole('button', { name: /Algorithms/ });
    const conceptsButton = screen.getByRole('button', { name: /Concepts/ });
    
    expect(homeButton).toBeInTheDocument();
    expect(dataStructuresButton).toBeInTheDocument();
    expect(algorithmsButton).toBeInTheDocument();
    expect(conceptsButton).toBeInTheDocument();
  });

  test('renders welcome section on home page', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to CodeReady/i)).toBeInTheDocument();
  });
});
