import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

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
    <div className="w-full space-y-6 px-8 py-8">
      <button
        className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon />
      </button>

      <div className="mb-1 flex items-center gap-2 text-xs">
        <span
          className="cursor-pointer text-text-gray"
          onClick={handleBackClick}
        >
          Minhas tarefas
        </span>
        <ChevronRightIcon className="text-text-gray" />
        <span className="font-semibold text-primary">{task?.title}</span>
      </div>

      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">{task?.title}</h1>

        <Button className="bg-danger">
          <TrashIcon />
          Deletar tarefa
        </Button>
      </div>

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div>
          <Input id="title" label="Nome" value={task?.title} disabled />
        </div>

        <div>
          <TimeSelect id="time" label="Horário" value={task?.time} disabled />
        </div>

        <div>
          <Input
            id="description"
            label="Descrição"
            value={task?.description}
            disabled
          />
        </div>
      </div>

      <div className="flex w-full justify-end gap-3">
        <Button size="large" color="secondary">
          Cancelar
        </Button>
        <Button size="large" color="primary">
          Salvar
        </Button>
      </div>
    </div>
  )
}

export default TaskDetailsPage
