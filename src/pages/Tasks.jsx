import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons"
import Header from "../components/Header"
import TaskItem from "../components/TaskItem"
import TasksSeparator from "../components/TasksSeparator"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const TasksPage = () => {
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks?.filter((task) => task.time === "evening")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

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
