import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  // Initialize with demo todos as required
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: true },
    { id: 3, text: 'Build todo app', completed: false }
  ]);

  // Method to add new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Simple ID generation
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Method to toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Method to delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        Todo List
      </h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                flex: 1,
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#6c757d' : '#212529',
                padding: '5px'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '20px' }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
};

export default TodoList;