import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        if (!response.ok) {
          throw new Error("Erro ao buscar detalhes da tarefa")
        }
        const data = await response.json()
        setTask(data)
      } catch (error) {
        console.error(error)
        toast.error("Erro ao buscar detalhes da tarefa")
      }
    }

    fetchTask()
  }, [taskId])

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold">Detalhes da Tarefa</h1>
      <p>Aqui você pode ver os detalhes da tarefa selecionada.</p>
      {task && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p className="text-gray-600">{task.description}</p>
        </div>
      )}
    </div>
  )
}

export default TaskDetailsPage
