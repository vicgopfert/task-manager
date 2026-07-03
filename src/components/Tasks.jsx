import { useState } from "react"
import Header from "./Header"

function Tasks() {
  const [inputValue, setInputValue] = useState("teste")
  const [messagens, setMessagens] = useState(["Play games", "Watch doramas"])

  function handleButtonClick() {
    setMessagens([...messagens, inputValue])
  }

  return (
    <div>
      <Header>
        <h1>Add a Task</h1>
      </Header>

      <input
        className="input"
        type="text"
        placeholder="Create your task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button className="button" onClick={handleButtonClick}>
        Add Task
      </button>

      <Header>
        <h1>My Tasks</h1>
      </Header>

      <div>
        <ul>
          {messagens.map((mensagem, index) => (
            <li key={index}>{mensagem}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tasks
