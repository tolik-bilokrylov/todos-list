import React, { useState, useEffect, useRef } from 'react';

function TodoForm({ carrentTodosList, setStatus, ...props }) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const statusTodos = (event) => {
    setStatus(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
          <select
            onChange={statusTodos}
            name="characters"
            className="todo-button btn-select"
          >
            <option
              className="option"
              value="all"
            >
              All
            </option>
            <option
              className="option"
              value="completedTodos"
            >
              Completed
            </option>
            <option
              className="option"
              value="uncompletedTodos"
            >
              Uncompleted
            </option>
          </select>
        </>
      )}
    </form>
  );
}

export default TodoForm;
