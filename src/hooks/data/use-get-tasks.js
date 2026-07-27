import { useQuery } from "@tanstack/react-query"

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks")
      if (!response.ok) {
        throw new Error("Erro ao buscar tarefas")
      }
      return response.json()
    },
  })
}
