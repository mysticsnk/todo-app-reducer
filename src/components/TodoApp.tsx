import { useReducer, useState } from 'react';
import { todoReducer, initialState, actions } from '../store/todos';

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch(actions.addTodo(inputValue))
      setInputValue('');
    }
  };

  const deleteTodo = (id: number) => {
    dispatch(actions.deleteTodo(id))
  };

  const toggleTodo = (id: number) => {
    dispatch(actions.toggleTodo(id))
  };

  return (
    <div>
      <h1>Список завдань</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>Додати завдання</button>
      <button onClick={() => dispatch(actions.clearCompletedTodos())}>Очистити зроблені</button>
      <ul>
        {state.items.map(todo => (
          <li key={todo.id.toString()}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? 'Скасувати' : 'Виконати'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
