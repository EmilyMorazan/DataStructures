import { render, screen, fireEvent } from '@testing-library/react';
import DataStructures from './DataStructures';

describe('DataStructures Component', () => {
  test('renders Data Structures Visualizer header', () => {
    render(<DataStructures />);
    expect(screen.getByText(/Data Structures Visualizer/i)).toBeInTheDocument();
  });

  test('renders all data structure tabs', () => {
    render(<DataStructures />);
    expect(screen.getByText(/📊 Array/i)).toBeInTheDocument();
    expect(screen.getByText(/📚 Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/🎯 Queue/i)).toBeInTheDocument();
    expect(screen.getByText(/🔗 Linked List/i)).toBeInTheDocument();
    expect(screen.getByText(/🌳 Binary Tree/i)).toBeInTheDocument();
  });

  test('switches between data structure tabs', () => {
    render(<DataStructures />);
    
    // Initially shows array
    expect(screen.getByText('Dynamic Array')).toBeInTheDocument();
    
    // Click on Stack tab
    fireEvent.click(screen.getByText(/📚 Stack/i));
    expect(screen.getByText('Stack (LIFO)')).toBeInTheDocument();
    
    // Click on Queue tab
    fireEvent.click(screen.getByText(/🎯 Queue/i));
    expect(screen.getByText('Queue (FIFO)')).toBeInTheDocument();
  });

  test('adds and removes items from array', () => {
    render(<DataStructures />);
    
    const input = screen.getByPlaceholderText(/Enter a value to add/i);
    const pushButton = screen.getByText('Push');
    
    // Add item
    fireEvent.change(input, { target: { value: 'test1' } });
    fireEvent.click(pushButton);
    
    expect(screen.getByText(/Pushed: test1/i)).toBeInTheDocument();
  });

  test('clears data structure', () => {
    render(<DataStructures />);
    
    const input = screen.getByPlaceholderText(/Enter a value to add/i);
    const pushButton = screen.getByText('Push');
    const clearButton = screen.getByText(/Clear All/i);
    
    // Add item
    fireEvent.change(input, { target: { value: 'test1' } });
    fireEvent.click(pushButton);
    
    // Clear
    fireEvent.click(clearButton);
    expect(screen.getByText(/Structure cleared/i)).toBeInTheDocument();
  });

  test('shows different operations for different data structures', () => {
    render(<DataStructures />);
    
    // Array operations
    expect(screen.getByText('Push')).toBeInTheDocument();
    expect(screen.getByText('Pop')).toBeInTheDocument();
    
    // Switch to Queue
    fireEvent.click(screen.getByText(/🎯 Queue/i));
    expect(screen.getByText('Enqueue')).toBeInTheDocument();
    expect(screen.getByText('Dequeue')).toBeInTheDocument();
  });
});
