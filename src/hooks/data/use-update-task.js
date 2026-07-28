import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (task) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, task)
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) =>
        currentTasks
          ? currentTasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            )
          : currentTasks
      )
      queryClient.setQueryData(taskQueryKeys.getById(taskId), (oldTask) =>
        oldTask ? { ...oldTask, ...updatedTask } : updatedTask
      )
    },
    onError: (error) => {
      console.error("Erro ao atualizar tarefa", error)
    },
  })
}

export const useUpdateTaskStatus = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.updateStatus(taskId),
    mutationFn: async (status) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        status,
      })
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) =>
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
