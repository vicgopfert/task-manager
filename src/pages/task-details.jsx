import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

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

  const editTask = async (editedTask) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      })
      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa")
      }
      const data = await response.json()
      setTask(data)
      toast.success("Tarefa atualizada com sucesso")
      return true
    } catch (error) {
      console.error(error)
      toast.error("Erro ao atualizar tarefa")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveClick = async () => {
    const newErrors = []

    const title = titleRef.current.value.trim()
    const time = timeRef.current.value
    const description = descriptionRef.current.value.trim()

    if (!title) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }
    if (!time) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório.",
      })
    }
    if (!description) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    const editedTask = {
      title,
      time,
      description,
    }

    const isEdited = await editTask(editedTask)
    if (isEdited) {
      navigate("/")
    }
  }

  const handleDeleteClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Erro ao deletar tarefa")
      }
      toast.success("Tarefa deletada com sucesso")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao deletar tarefa")
    } finally {
      setIsLoading(false)
    }
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return (
    <div className="w-full space-y-6 px-8 py-8">
      <button
        className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon />
      </button>

      <div className="mb-1 flex items-center gap-2 text-xs">
        <Link className="cursor-pointer text-text-gray" to="/">
          Minhas tarefas
        </Link>
        <ChevronRightIcon className="text-text-gray" />
        <span className="font-semibold text-primary">{task?.title}</span>
      </div>

      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">{task?.title}</h1>

        <Button className="bg-danger" onClick={handleDeleteClick}>
          <TrashIcon />
          Deletar tarefa
        </Button>
      </div>

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div>
          <Input
            id="title"
            label="Nome"
            defaultValue={task?.title}
            ref={titleRef}
            disabled={isLoading}
            errorMessage={titleError?.message}
          />
        </div>

        <div>
          <TimeSelect
            id="time"
            label="Horário"
            defaultValue={task?.time}
            ref={timeRef}
            disabled={isLoading}
            errorMessage={timeError?.message}
          />
        </div>

        <div>
          <Input
            id="description"
            label="Descrição"
            defaultValue={task?.description}
            ref={descriptionRef}
            disabled={isLoading}
            errorMessage={descriptionError?.message}
          />
        </div>
      </div>

      <div className="flex w-full justify-end gap-3">
        <Button
          size="large"
          color="primary"
          onClick={handleSaveClick}
          disabled={isLoading}
        >
          {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
          Salvar
        </Button>
      </div>
    </div>
  )
}

export default TaskDetailsPage
