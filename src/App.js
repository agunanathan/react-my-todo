import React, { useState, useRef, useEffect } from 'react';
import TodoList from './Components/TodoList';
import {v4 as uuidv4} from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

const App = () => {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function handleClearCompletedTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  function toogleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function deleteTodo(id){
    let newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.deleted = true
    newTodos = todos.filter(todo => !todo.deleted)
    setTodos(newTodos)
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value=null
  }

  return (
    <>
    <input aria-label='input todo' ref={todoNameRef} type="text" onKeyDown={handleKeydown} autoFocus/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearCompletedTodos}>Clear Completed Todos</button> 
    <div> You have {todos.filter(todo => !todo.complete).length} todos to complete</div>
    <TodoList todos={todos} toggleTodo={toogleTodo} deleteTodo={deleteTodo}/>
    </>
  )
};

export default App;