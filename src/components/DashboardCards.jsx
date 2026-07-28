import { LoaderIcon, Tasks2Icon, TasksIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter((task) => task.status === "not_started")
  const inProgressTasks = tasks?.filter((task) => task.status === "in_progress")
  const completedTasks = tasks?.filter((task) => task.status === "done")

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        info={tasks?.length}
        description={"Tarefas totais"}
      />
      <DashboardCard
        icon={<LoaderIcon />}
        info={notStartedTasks?.length}
        description={"Tarefas não iniciadas"}
      />
      <DashboardCard
        icon={<LoaderIcon />}
        info={inProgressTasks?.length}
        description={"Tarefas em andamento"}
      />
      <DashboardCard
        icon={<TasksIcon />}
        info={completedTasks?.length}
        description={"Tarefas concluídas"}
      />
    </div>
  )
}

export default DashboardCards
