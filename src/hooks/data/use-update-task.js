import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (task) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa")
      }
      const updatedTask = await response.json()
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
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa")
      }
      const updatedTask = await response.json()
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
