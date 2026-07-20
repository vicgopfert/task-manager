import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TasksSeparator from "./TasksSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks")
        if (!response.ok) {
          throw new Error("Erro ao buscar tarefas")
        }
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error(error)
        toast.error("Erro ao buscar tarefas")
      }
    }

    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const nightTasks = tasks.filter((task) => task.time === "evening")

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

  const handleTaskCheckboxClick = (task) => {
    const newStatus = STATUS_CYCLE[task.status]

    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    )
    setTasks(newTasks)

    const { message, type } = STATUS_TOAST[newStatus]
    toast[type](message)
  }

  const onDeleteTaskSuccess = async (task) => {
    const newTasks = tasks.filter((t) => t.id !== task.id)
    setTasks(newTasks)
    toast.success("Tarefa deletada com sucesso!")
  }

  const handleAddTaskSubmit = async (newTask) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })

      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa")
      }

      setTasks([...tasks, newTask])
      toast.success("Tarefa adicionada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao adicionar tarefa")
    }
  }

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
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
