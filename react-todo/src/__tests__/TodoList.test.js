import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render test - verify component renders correctly with demo todos
  test('renders TodoList component with initial demo todos', () => {
    render(<TodoList />);
    
    // Check if the main title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if the demo todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Build todo app')).toBeInTheDocument();
    
    // Check if the form is rendered
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  // Test 2: Adding todos - verify that new todo can be added
  test('allows user to add a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Type a new todo
    await user.type(input, 'New test todo');
    await user.click(addButton);
    
    // Verify the new todo appears in the list
    expect(screen.getByText('New test todo')).toBeInTheDocument();
    
    // Verify the input is cleared after adding
    expect(input.value).toBe('');
  });

  // Test 3: Adding todos via form submission (Enter key)
  test('allows user to add todo by pressing Enter', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    
    // Type and press Enter
    await user.type(input, 'Todo via Enter{enter}');
    
    // Verify the new todo appears in the list
    expect(screen.getByText('Todo via Enter')).toBeInTheDocument();
    
    // Verify the input is cleared
    expect(input.value).toBe('');
  });

  // Test 4: Prevent adding empty todos
  test('does not add empty todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const addButton = screen.getByText('Add Todo');
    const initialTodos = screen.getAllByRole('listitem');
    
    // Try to add empty todo
    await user.click(addButton);
    
    // Verify no new todo was added
    const todosAfter = screen.getAllByRole('listitem');
    expect(todosAfter).toHaveLength(initialTodos.length);
  });

  // Test 5: Prevent adding todos with only whitespace
  test('does not add todos with only whitespace', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    const initialTodos = screen.getAllByRole('listitem');
    
    // Try to add whitespace-only todo
    await user.type(input, '   ');
    await user.click(addButton);
    
    // Verify no new todo was added
    const todosAfter = screen.getAllByRole('listitem');
    expect(todosAfter).toHaveLength(initialTodos.length);
  });

  // Test 6: Toggling todo completion - verify clicking on todo toggles completion
  test('allows user to toggle todo completion status', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find the first todo (Learn React) which should be incomplete
    const firstTodo = screen.getByText('Learn React');
    
    // Initially, it should not have line-through style
    expect(firstTodo).toHaveStyle('text-decoration: none');
    
    // Click to toggle completion
    await user.click(firstTodo);
    
    // Now it should have line-through style (completed)
    expect(firstTodo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    await user.click(firstTodo);
    
    // Should be back to no line-through (incomplete)
    expect(firstTodo).toHaveStyle('text-decoration: none');
  });

  // Test 7: Verify completed todo has proper styling
  test('applies proper styling to completed todos', () => {
    render(<TodoList />);
    
    // Find the second todo (Write tests) which is initially completed
    const completedTodo = screen.getByText('Write tests');
    
    // Should have line-through style and muted color
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
    expect(completedTodo).toHaveStyle('color: #6c757d');
  });

  // Test 8: Deleting todos - verify that todos can be deleted
  test('allows user to delete a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Initially should have 3 todos
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Find and click the delete button for the first todo
    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);
    
    // Should now have 2 todos and the deleted todo should be gone
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  // Test 9: Delete all todos and verify empty state
  test('shows empty state message when all todos are deleted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Should show empty state message
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    
    // Should not have any list items
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  // Test 10: Complex workflow - add, toggle, and delete
  test('handles complex workflow of add, toggle, and delete operations', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    
    // Add a new todo
    await user.type(input, 'Complex workflow todo');
    await user.click(screen.getByText('Add Todo'));
    
    // Verify it was added
    const newTodo = screen.getByText('Complex workflow todo');
    expect(newTodo).toBeInTheDocument();
    expect(newTodo).toHaveStyle('text-decoration: none');
    
    // Toggle its completion
    await user.click(newTodo);
    expect(newTodo).toHaveStyle('text-decoration: line-through');
    
    // Delete it
    const deleteButtons = screen.getAllByText('Delete');
    const newTodoDeleteButton = deleteButtons[deleteButtons.length - 1]; // Last button (for the new todo)
    await user.click(newTodoDeleteButton);
    
    // Verify it was deleted
    expect(screen.queryByText('Complex workflow todo')).not.toBeInTheDocument();
  });
});