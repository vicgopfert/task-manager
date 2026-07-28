import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useClearTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.clear(),
    mutationFn: async () => {
      const { data: tasks } = await api.get("/tasks")
      await Promise.all(tasks.map((task) => api.delete(`/tasks/${task.id}`)))
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), [])
    },
    onError: (error) => {
      console.error("Erro ao limpar tarefas", error)
    },
  })
}
