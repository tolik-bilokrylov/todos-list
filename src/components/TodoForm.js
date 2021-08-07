import React, { useState, useEffect, useRef } from 'react';

function TodoForm({ completedTodos, uncompletedTodos, allTodos, ...props }) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (event) => {
    setInput(event.target.value);
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
          <div className="select">
            <button
              onClick={allTodos}
              className='todo-button btn-select'
            >
              All
            </button>
            <button
              onClick={completedTodos}
              className='todo-button btn-select'
            >
              Completed
            </button>
            <button
              onClick={uncompletedTodos}
              className='todo-button btn-select'
            >
              Uncompleted
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default TodoForm;
