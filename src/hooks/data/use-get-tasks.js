import { useQuery } from "@tanstack/react-query"

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks")
      if (!response.ok) {
        throw new Error("Erro ao buscar tarefas")
      }
      const tasks = await response.json()
      return tasks
    },
  })
}

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
      if (!response.ok) {
        throw new Error("Erro ao buscar tarefa")
      }
      const task = await response.json()
      return task
    },
  })
}
