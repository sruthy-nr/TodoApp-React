// src/components/Todo.tsx
import React, { useState } from 'react';
import './style.css';

interface Todo {
  id: number;
  text: string;
  fromtime: string;
  totime: string;
  date: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [inputFromTime, setInputFromTime] = useState<string>('');
  const [inputToTime, setInputToTime] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>('');
  const [editText, setEditText] = useState<string>('');
  const [editFromTime, setEditFromTime] = useState<string>('');
  const [editToTime, setEditToTime] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterDate, setFilterDate] = useState<string>('');

  const today = new Date().toISOString().split('T')[0];

  const addTodo = () => {
    if (inputText.trim() === '' || inputFromTime.trim() === '' || inputToTime.trim() === '' || inputDate.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      fromtime: inputFromTime,
      totime: inputToTime,
      date: inputDate,
      completed: false,
    };
    console.log(newTodo);

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id: number, text: string, fromtime: string, totime: string) => {
    setEditingId(id);
    setEditText(text);
    setEditFromTime(fromtime);
    setEditToTime(totime);
  };

  const saveEditing = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editText, fromtime: editFromTime, totime: editToTime } : todo
      )
    );
    setEditingId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
    setInputDate(e.target.value);
  };

  const filteredTodos = filterDate
    ? todos.filter((todo) => todo.date === filterDate)
    : todos;

//   const deleteTodo = (id: number) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };
  

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        {/* <input
          type="date"
          value={inputDate}
          min={today}
          onChange={(e) => setInputDate(e.target.value)}
        />  */}
        Date: 
        <input
          type="date"
          min={today}
          value={filterDate}
          onChange={handleFilterChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          placeholder="Add a todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        /> <br /><br />
        FROM:<input
          type="time"
          value={inputFromTime}
          onChange={(e) => setInputFromTime(e.target.value)}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        TO:<input
          type="time"
          value={inputToTime}
          onChange={(e) => setInputToTime(e.target.value)}
        />&nbsp;&nbsp;&nbsp;&nbsp; <br /><br />
        <button onClick={addTodo} className='button'>Add</button>
      </div>
      <div className='xyz'>
        {filteredTodos.map((todo) => (
          <span key={todo.id}>
          {editingId === todo.id ? (
            <div>
                <div className="card">
                    <div className="container">
                        <br />
              Task: <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              /> <br /><br />
             From: <input
                type="time"
                value={editFromTime}
                onChange={(e) => setEditFromTime(e.target.value)}
              />&nbsp;&nbsp;
             To: <input
                type="time"
                value={editToTime}
                onChange={(e) => setEditToTime(e.target.value)}
              />
              <br /><br />
              <button onClick={() => saveEditing(todo.id)}>Save</button>&nbsp;&nbsp;
              <button onClick={cancelEditing}>Cancel</button>
              </div>
              </div>
            </div>
          ) : (
            <div>
                <div className="card">
                    <div className="container">
                    {todo.date}
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <h4><b>Task:  {todo.text}</b>
                        <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        />
                        </h4>
                            <p>Time: {todo.fromtime} - {todo.totime}</p>
              </span>
                    </div>
                    {!todo.completed&&<button className='button' onClick={() => startEditing(todo.id, todo.text, todo.fromtime, todo.totime)}>Edit</button>}
              {todo.completed&& <b className='done'>DONE</b>}
                </div>
              
              {/* <button onClick={() => deleteTodo(todo.id)}>Delete</button> */}
            </div>
          )}
        </span>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
