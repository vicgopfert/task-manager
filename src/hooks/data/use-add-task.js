import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (newTask) => {
      const { data: createdTask } = await api.post("/tasks", newTask)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) =>
        currentTasks ? [...currentTasks, createdTask] : currentTasks
      )
    },
    onError: (error) => {
      console.error("Erro ao adicionar tarefa", error)
    },
  })
}
