import DashboardCards from "../components/DashboardCards"
import Header from "../components/Header"
import TaskItem from "../components/TaskItem"
import WaterCard from "../components/WaterCard"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter((task) => task.status === "not_started")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Início" title="Dashboard" />

      <DashboardCards />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6 rounded-xl bg-white p-6">
          <div>
            <h3>Tarefas</h3>
            <span className="text-sm text-gray-500">
              Resumo das tarefas disponíveis
            </span>
          </div>

          <div className="space-y-3">
            {notStartedTasks?.length === 0 ? (
              <p className="text-sm text-text-gray">
                Nenhuma tarefa disponível.
              </p>
            ) : (
              notStartedTasks?.map((task) => (
                <TaskItem task={task} key={task.id} />
              ))
            )}
          </div>
        </div>

        <WaterCard />
      </div>
    </div>
  )
}

export default HomePage
