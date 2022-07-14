import React, {useState} from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // I choose type, not the interface.
  // Because interface is so open to extension that bug are more likely to occur.
  // interface is used to define the structure of the object, class, function. Used for App development.
  // Type Alias is used to name types that will be reused in multiple locations. Used for Library development.
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value); // the value is stored in inputValue.
  }

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // reload Avoidance. I forget often.

    // creating new Todo
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setInputValue("");
    setTodos([newTodo, ...todos]); // new todo stored in all other todos
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo; //newTodos is void.todos is array of todo.
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo; //newTodos is void.todos is array of todo.
    });

    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    // pick up all ids except the one you delete
    const newTodos = todos.filter((todo) =>  todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Todoリスト</h1>
        {/* onSubmit is Event Processing when venting occurs*/}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text" onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input
            type="submit" value="create"
            className="submitButton"
          />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text" onChange={(e) => handleEdit(todo.id, e.target.value)}
                value={todo.inputValue} className="inputText"
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
                className="submitButton"
              />
              <button
                onClick={() => handleDelete(todo.id)}
                className="deleteButton"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;

// this is the process to create the App.

// Design of individual data
// We need typescript data of todoname, todoId , boolean weather completed or not.
// We need the three States. So we create three functions to get state.
// First function is sending inputname.
// Second function is creating Id.
// third function is switching check of completed.

// Design of set of data
//