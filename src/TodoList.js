import React, {useState, useEffect} from 'react'
import Modal from './components/Modal';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const TodoList = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const[todo, setTodo] = useState("");
  const[todos, setTodos] = useState([]);
  const[editId, setEditId] = useState(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  const handleEditTodo = (selectedTodoId) => {
    setModalOpen(true);
    const selectedTodoObject = todos.find((item) => item.id === selectedTodoId);
    setTodo(selectedTodoObject.todo);
    setEditId(selectedTodoId);
  }
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todo !== "") {
    setTodos([{id: `todo-${Date.now()}` , todo }, ...todos]) //date.now will produces unique number by give current time in millisecond
    setTodo("");
}
};
  const handleSaveTodo = (e) =>{
        e.preventDefault();  
     
      const updatedTodos = todos.map((item)=>item.id===editId ? {id: todo.id, todo} :item);
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      setModalOpen(false);
    
  }

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos ([...delTodo]);
  };

  function toogleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
 
  return (
    <div>
      <h1>Todo List </h1>
      <form className= "todolist" onSubmit={handleAddTodo}>
        <input type= "text" placeholder='Todo'  autoFocus value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button type= "submit"> {false? "Edit" : "Add"}</button>
      </form>
      <ul className= "todolist"> 
      {
        todos.map((item) => (
        <li className = "todoitem"> 
        <span key={item.id}>{item.todo} </span>
        <input aria-label="checkbox" type="checkbox" checked={todo.complete} onChange={toogleTodo}/>
        <button onClick={() => handleEditTodo(item.id)}>Edit</button>
        <button onClick={() => handleDelete(item.id)}> Delete</button>
        </li>
        ))
      }
     </ul>
     {isModalOpen &&
     <Modal> 
      <form className= "todolist" onSubmit={handleSaveTodo}>
        <input  aria-label="edit input" type= "text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type= "submit"> Save</button>
        <button type= "button" onClick={()=>setModalOpen(false)}> Cancel</button>
     </form>
      </Modal>
     }
    </div>
  )
}

export default TodoList