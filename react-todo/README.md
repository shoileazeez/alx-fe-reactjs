# React Todo App

A fully functional Todo List application built with React, featuring comprehensive testing with Jest and React Testing Library.

## Features

✅ **Display Todos** - Shows a list of todo items with initial demo data  
✅ **Add Todos** - Users can add new todos via form input  
✅ **Toggle Completion** - Click on todos to toggle between completed/incomplete  
✅ **Delete Todos** - Individual delete buttons for each todo  
✅ **Form Validation** - Prevents adding empty or whitespace-only todos  
✅ **Responsive Design** - Clean, user-friendly interface  
✅ **Comprehensive Testing** - 10 test cases covering all functionality

## Components

### TodoList
- Main component that manages todo state
- Displays list of todos with demo data
- Handles adding, toggling, and deleting todos
- Shows empty state message when no todos exist

### AddTodoForm
- Form component for adding new todos
- Includes input validation
- Supports both button click and Enter key submission
- Clears input after successful submission

## Testing

The application includes comprehensive tests covering:

1. **Initial Render** - Verifies component renders with demo todos
2. **Adding Todos** - Tests adding via button click and Enter key
3. **Input Validation** - Prevents empty and whitespace-only todos
4. **Toggle Completion** - Tests clicking to toggle todo completion status
5. **Styling Verification** - Confirms completed todos have proper styling
6. **Delete Functionality** - Tests individual todo deletion
7. **Empty State** - Verifies empty state message display
8. **Complex Workflows** - Tests combination of add, toggle, and delete operations

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Lint code**
   ```bash
   npm run lint
   ```

## Project Structure

```
src/
├── components/
│   ├── TodoList.jsx      # Main todo list component
│   └── AddTodoForm.jsx   # Form for adding todos
├── __tests__/
│   └── TodoList.test.js  # Comprehensive test suite
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── setupTests.js        # Test configuration
```

## Technologies Used

- **React** - UI library with hooks for state management
- **Vite** - Build tool and development server
- **Jest** - Testing framework
- **React Testing Library** - Testing utilities for React
- **ESLint** - Code linting and formatting

## API and Functionality

The TodoList component provides the following methods:

- `addTodo(text)` - Adds a new todo with the given text
- `toggleTodo(id)` - Toggles completion status of todo with given ID
- `deleteTodo(id)` - Removes todo with given ID

Each todo has the following structure:
```javascript
{
  id: Number,        // Unique identifier
  text: String,      // Todo description
  completed: Boolean // Completion status
}
```

## Demo Data

The application initializes with three demo todos:
- "Learn React" (incomplete)
- "Write tests" (completed)
- "Build todo app" (incomplete)

This demonstrates both completed and incomplete todo states for testing purposes.

---

This project demonstrates best practices for React development including component composition, state management, form handling, and comprehensive testing strategies.
