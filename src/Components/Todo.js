import React from 'react'

export default function Todo({todo, toggleTodo, editTodo, deleteTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    function handleDeleteTodo(){
        deleteTodo(todo.id)
    }
  return (
    <div>
        <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}
      </label>
      <button onClick={handleDeleteTodo}>Delete</button>
    </div>
  )
}