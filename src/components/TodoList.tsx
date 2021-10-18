import React, { useState, useEffect, useMemo } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';


interface TodoI {
  text: string,
  id: null | number,
  isComplete: boolean,
}

interface LocalStorage {
  localStorage: null | string
}

function TodoList() {
  const [todos, setTodos] = useState([] as TodoI[]);
  const [status, setStatus] = useState("all");

  const addTodo = (todo: TodoI) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    };

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updatedTodo = (todoId: number, newValue: TodoI) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    };

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id: number | null) => {
    const removeArr = todos.filter(todo => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id: number | null) => {
    let updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      
      return todo;
    });
    setTodos(updateTodos);
  };

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (status === "all") {
      return result;
    }

    if (status === "completedTodos") {
      result = result.filter(todo => todo.isComplete === true);
    }

    if (status === "uncompletedTodos") {
      result = result.filter(todo => todo.isComplete !== true);
    }

    return result;
  }, [todos, status]);

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    const todosLocal = localStorage.getItem("todos");
    if ( todosLocal === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else if (typeof  todosLocal === "string") {
      let todoLocal = JSON.parse( todosLocal);
      setTodos(todoLocal);
    }
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  });

  return (
    <div>
      <h1 className="title">
        What`s the Plan for Today?
      </h1>
      <TodoForm
        onSubmit={addTodo}
        setStatus={setStatus}
      />
      <Todo
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updatedTodo={updatedTodo}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default TodoList;