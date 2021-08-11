import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';

const Todo = ({ completeTodo, removeTodo, updateTodo, filteredTodos }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return filteredTodos.map((todo, index) => (
    <div
      className={todo.isComplete
        ? 'todo-row complete'
        : 'todo-row'}
      key={index}
    >
      <div key={todo.id}>
        {todo.text}
      </div>
      <div className='icons'>
        <FaCheck
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
          className='icon-style'
        />
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='icon-style'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='icon-style'
        />
      </div>
    </div>
  ));
};

export default Todo;
