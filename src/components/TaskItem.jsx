import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { tv } from "tailwind-variants"

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import { useDeleteTask } from "../hooks/data/use-delete-task"
import { useUpdateTaskStatus } from "../hooks/data/use-update-task"
import Button from "./Button"

const taskItem = tv({
  base: "flex items-center justify-between gap-2 rounded-lg bg-current/10 px-4 py-3 text-sm transition",
  variants: {
    status: {
      done: "text-primary",
      in_progress: "text-process",
      not_started: "bg-dark-blue/5 text-dark-blue",
    },
  },
})

const checkbox = tv({
  base: "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg",
  variants: {
    status: {
      done: "bg-primary text-white",
      in_progress: "bg-process text-white",
      not_started: "bg-dark-blue/10",
    },
  },
})

const STATUS_ICON = {
  done: <CheckIcon className="pointer-events-none relative z-10 h-4 w-4" />,
  in_progress: (
    <LoaderIcon className="pointer-events-none relative z-10 h-4 w-4 animate-spin" />
  ),
  not_started: null,
}

const STATUS_CYCLE = {
  not_started: "in_progress",
  in_progress: "done",
  done: "not_started",
}

const STATUS_TOAST = {
  in_progress: { message: "Tarefa em andamento", type: "info" },
  done: { message: "Tarefa concluída", type: "success" },
  not_started: { message: "Tarefa reiniciada", type: "warning" },
}

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(task.id)
  const { mutate: updateStatus, isPending: isStatusUpdating } =
    useUpdateTaskStatus(task.id)

  const status = task.status in STATUS_ICON ? task.status : "not_started"

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa")
      },
    })
  }

  const handleCheckboxClick = () => {
    const newStatus = STATUS_CYCLE[task.status] ?? STATUS_CYCLE.not_started
    updateStatus(newStatus, {
      onSuccess: (updatedTask) => {
        const { message, type } = STATUS_TOAST[updatedTask.status]
        toast[type](message)
      },
      onError: () => {
        toast.error("Erro ao atualizar tarefa")
      },
    })
  }

  return (
    <div className={taskItem({ status })}>
      <div className="flex items-center gap-2">
        <label className={checkbox({ status })}>
          <input
            type="checkbox"
            checked={task.status === "done"}
            onChange={handleCheckboxClick}
            disabled={isStatusUpdating}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
          {STATUS_ICON[status]}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-1">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isDeleting}>
          {isDeleting ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon className="text-red-400" />
          )}
        </Button>
        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }).isRequired,
}

export default TaskItem
