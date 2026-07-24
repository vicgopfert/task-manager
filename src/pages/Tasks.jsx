import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "../components/AddTaskDialog"
import Button from "../components/Button"
import TaskItem from "../components/TaskItem"
import TasksSeparator from "../components/TasksSeparator"

const TasksPage = () => {
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks")
    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas")
    }
    return response.json()
  }
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks?.filter((task) => task.time === "evening")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-primary">
            Minhas Tarefas
          </span>

          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button color="ghost">
            Limpar Tarefa
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova Tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 ? (
            <p className="text-sm text-text-gray">
              Nenhuma tarefa para a manhã.
            </p>
          ) : (
            morningTasks?.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 ? (
            <p className="text-sm text-text-gray">
              Nenhuma tarefa para a tarde.
            </p>
          ) : (
            afternoonTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 ? (
            <p className="text-sm text-text-gray">
              Nenhuma tarefa para a noite.
            </p>
          ) : (
            eveningTasks?.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default TasksPage
