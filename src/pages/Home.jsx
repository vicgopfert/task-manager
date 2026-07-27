import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons"
import DashboardCard from "../components/DashboardCard"
import Header from "../components/Header"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter((task) => task.status === "not_started")
  const inProgressTasks = tasks?.filter((task) => task.status === "in_progress")
  const completedTasks = tasks?.filter((task) => task.status === "done")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Início" title="Dashboard" />

      <div className="grid grid-cols-4 gap-9">
        <DashboardCard
          icon={<Tasks2Icon />}
          info={notStartedTasks?.length}
          description={"Tarefas disponíveis"}
        />
        <DashboardCard
          icon={<TasksIcon />}
          info={completedTasks?.length}
          description={"Tarefas concluidas"}
        />
        <DashboardCard
          icon={<LoaderIcon />}
          info={inProgressTasks?.length}
          description={"Tarefas em andamento"}
        />
        <DashboardCard
          icon={<GlassWaterIcon />}
          info={"5"}
          description={"Água"}
        />
      </div>
    </div>
  )
}

export default HomePage
