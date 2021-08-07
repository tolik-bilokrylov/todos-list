import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    };

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    };

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });
    setTodos(updateTodos);
  };

  const completedTodos = () => {
    setFilteredTodos(todos.filter(todo => todo.isComplete === true));
  }

  const uncompletedTodos = () => {
    setFilteredTodos(todos.filter(todo => todo.isComplete === undefined));
  }

  const allTodos = () => {
    setFilteredTodos(todos);
  }

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  });

  /* eslint-disable */
  useEffect(() => {
    completedTodos();
    uncompletedTodos();
    allTodos()
  }, [todos]);
  /* eslint-enable */

  return (
    <div>
      <h1>
        What`s the Plan for Today?
      </h1>
      <TodoForm
        onSubmit={addTodo}
        completedTodos={completedTodos}
        uncompletedTodos={uncompletedTodos}
        allTodos={allTodos}
      />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default TodoList;
