import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState([])
  const addTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, task])
      setTask("")
    }
  }
  return (
    <>
      <h1>Manit ki toDoApp</h1>
      <input 
        type="text" 
        value={task}
        onChange={(e) => setTask(e.target.value)} 
        placeholder="De bhai task" 
      />
      <button onClick={addTask}>Kardo Add ek aur kaam jo nhi karoge</button>
      <ul>
        {todos.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </>
  )
}
export default App