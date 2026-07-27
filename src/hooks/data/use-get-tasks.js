import { useQuery } from "@tanstack/react-query"

import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get("/tasks")
      return tasks
    },
  })
}

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: taskQueryKeys.getById(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)
      return task
    },
  })
}
