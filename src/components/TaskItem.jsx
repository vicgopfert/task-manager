import PropTypes from "prop-types"
import { useState } from "react"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const STATUS_CONFIG = {
  done: {
    color: "text-primary",
    iconBg: "bg-primary text-white",
    icon: <CheckIcon className="pointer-events-none relative z-10 h-4 w-4" />,
  },
  in_progress: {
    color: "text-process",
    iconBg: "bg-process text-white",
    icon: (
      <LoaderIcon className="pointer-events-none relative z-10 h-4 w-4 animate-spin" />
    ),
  },
  not_started: {
    color: "text-dark-blue",
    iconBg: "bg-dark-blue/10",
    icon: null,
  },
}

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const status = STATUS_CONFIG[task.status]

  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Erro ao deletar tarefa")
      }
      onDeleteSuccess(task)
      setDeleteIsLoading(false)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao deletar tarefa")
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-current/10 px-4 py-3 text-sm transition ${status.color}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${status.iconBg}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            onChange={() => handleCheckboxClick(task)}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
          {status.icon}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-1">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon className="text-red-400" />
          )}
        </Button>
        <a href="#" className="py-1 transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
}

export default TaskItem
