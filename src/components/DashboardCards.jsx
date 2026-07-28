import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import { useGetWater } from "../hooks/data/use-water"
import DashboardCard from "./DashboardCard"

const WATER_GOAL = 2500

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()
  const { data: water } = useGetWater()

  const inProgressTasks = tasks?.filter((task) => task.status === "in_progress")
  const completedTasks = tasks?.filter((task) => task.status === "done")

  const waterPercentage =
    water && Math.round((water.consumed / WATER_GOAL) * 100)

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        info={tasks?.length}
        description={"Tarefas totais"}
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
      <DashboardCard
        icon={<GlassWaterIcon />}
        info={waterPercentage !== undefined ? `${waterPercentage}%` : undefined}
        description={"Água"}
      />
    </div>
  )
}

export default DashboardCards
