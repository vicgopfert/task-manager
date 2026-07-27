import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (task) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, task)
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (currentTasks) =>
        currentTasks
          ? currentTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          : currentTasks
      )
      queryClient.setQueryData(["task", taskId], updatedTask)
    },
    onError: (error) => {
      console.error("Erro ao atualizar tarefa", error)
    },
  })
}

export const useUpdateTaskStatus = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateTaskStatus", taskId],
    mutationFn: async (status) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        status,
      })
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (currentTasks) =>
        currentTasks
          ? currentTasks.map((task) =>
              task.id === updatedTask.id
                ? { ...task, status: updatedTask.status }
                : task
            )
          : currentTasks
      )
    },
    onError: (error) => {
      console.error("Erro ao atualizar status da tarefa", error)
    },
  })
}
