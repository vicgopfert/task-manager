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
import { useDeleteTask } from "../hooks/data/use-delete-task"
import { useGetTask } from "../hooks/data/use-get-tasks"
import { useUpdateTask } from "../hooks/data/use-update-task"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const { data: task } = useGetTask(taskId)
  const { mutate: updateTask, isPending: isEditing } = useUpdateTask(taskId)
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(taskId)
  const navigate = useNavigate()

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

    updateTask(editedTask, {
      onSuccess: () => {
        navigate("/")
        toast.success("Tarefa atualizada com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao atualizar tarefa")
      },
    })
  }

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        navigate("/")
        toast.success("Tarefa deletada com sucesso!")
      },
      onError: () => {
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
