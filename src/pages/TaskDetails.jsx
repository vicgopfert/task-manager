import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
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
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const updateTasksCache = (updater) => {
    queryClient.setQueryData(["tasks"], (currentTasks) =>
      currentTasks ? updater(currentTasks) : currentTasks
    )
  }

  const fetchTask = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
    if (!response.ok) {
      throw new Error("Erro ao buscar tarefa")
    }
    return response.json()
  }
  const { data: task } = useQuery({
    queryKey: ["task", taskId],
    queryFn: fetchTask,
  })

  const editTask = async (updatedTask) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
    if (!response.ok) {
      throw new Error("Erro ao atualizar tarefa")
    }
    return response.json()
  }
  const { mutate: editTaskMutate, isPending: isEditing } = useMutation({
    mutationKey: ["editTask", taskId],
    mutationFn: editTask,
  })

  const deleteTask = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Erro ao deletar tarefa")
    }
    return response.json()
  }
  const { mutate: deleteTaskMutate, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: deleteTask,
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
    values: task && {
      title: task.title,
      time: task.time,
      description: task.description,
    },
  })

  const handleSaveClick = (data) => {
    const title = data.title.trim()
    const time = data.time
    const description = data.description.trim()

    const editedTask = {
      title,
      time,
      description,
    }

    editTaskMutate(editedTask, {
      onSuccess: (updatedTask) => {
        updateTasksCache((currentTasks) =>
          currentTasks.map((t) =>
            t.id === updatedTask.id ? { ...t, ...updatedTask } : t
          )
        )
        navigate("/")
        toast.success("Tarefa atualizada com sucesso!")
      },
      onError: (error) => {
        console.error("Erro ao atualizar tarefa", error)
        toast.error("Erro ao atualizar tarefa")
      },
    })
  }

  const handleDeleteClick = () => {
    deleteTaskMutate(undefined, {
      onSuccess: () => {
        updateTasksCache((currentTasks) =>
          currentTasks.filter((t) => t.id !== task.id)
        )
        navigate("/")
        toast.success("Tarefa deletada com sucesso!")
      },
      onError: (error) => {
        console.error("Erro ao deletar tarefa", error)
        toast.error("Erro ao deletar tarefa")
      },
    })
  }

  return (
    <div className="w-full space-y-6 px-8 py-8">
      {/* Back Button */}
      <button
        className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon />
      </button>

      {/* Breadcrumb */}
      <div className="mb-1 flex items-center gap-2 text-xs">
        <Link className="cursor-pointer text-text-gray" to="/">
          Minhas tarefas
        </Link>
        <ChevronRightIcon className="text-text-gray" />
        <span className="font-semibold text-primary">{task?.title}</span>
      </div>

      {/* Task Title */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">{task?.title}</h1>

        <Button
          className="bg-danger"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon />
          )}
          Deletar tarefa
        </Button>
      </div>

      {/* Edit Task Form */}
      <form onSubmit={handleSubmit(handleSaveClick)}>
        <div className="space-y-6 rounded-xl bg-white p-6">
          <div>
            <Input
              id="title"
              label="Nome"
              {...register("title", {
                required: "O título é obrigatório",
                validate: (value) =>
                  value.trim() !== "" || "O título não pode estar vazio",
              })}
              errorMessage={errors?.title?.message}
              disabled={isEditing}
            />
          </div>

          <div>
            <TimeSelect
              id="time"
              label="Horário"
              {...register("time", {
                required: "O horário é obrigatório",
                validate: (value) =>
                  value.trim() !== "" || "O horário não pode estar vazio",
              })}
              errorMessage={errors?.time?.message}
              disabled={isEditing}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              {...register("description", {
                required: "A descrição é obrigatória",
                validate: (value) =>
                  value.trim() !== "" || "A descrição não pode estar vazio",
              })}
              errorMessage={errors?.description?.message}
              disabled={isEditing}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            type="submit"
            disabled={isEditing}
          >
            {isEditing && <LoaderIcon className="h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TaskDetailsPage
