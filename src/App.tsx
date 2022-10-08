import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const hadleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // new create TODO
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const hadleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const hadleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };
  
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => hanleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => hadleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton"/>
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => hadleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled= {todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => hadleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>
                消
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
