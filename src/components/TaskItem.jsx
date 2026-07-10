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

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const status = STATUS_CONFIG[task.status]

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
        <Button variant="ghost" onClick={() => handleDeleteClick(task)}>
          <TrashIcon className="text-red-400" />
        </Button>

        <a href="#" className="py-1 transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
