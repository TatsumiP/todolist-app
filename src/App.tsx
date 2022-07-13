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
    e.preventDefault(); // reload Avoidance
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Todoリスト</h1>
        {/* onSubmit is Event Processing when venting occurs*/}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text" onChange={(e) => handleChange(e)}
            className="inputText" />
          <input
            type="submit" value="create"
            className="submitButton"/>
        </form>
      </div>

    </div>
  );
}

export default App;

// this is the process to create the App.
// We need typescript data of todoname, todoId , boolean weather completed or not.
// We need the three States. So we create three functions to get state.
// First function is sending inputname.
// Second function is creating Id.
// third function is switching check of completed.
