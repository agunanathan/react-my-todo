import React from 'react'
import Todo from './Todo'

export default function TodoList( {todos, toggleTodo, editTodo, deleteTodo }) {
  return (
    
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
    })  
    
  )
}