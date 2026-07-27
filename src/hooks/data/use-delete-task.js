import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Erro ao deletar tarefa")
      }
      const deletedTask = await response.json()
      return deletedTask
    },
    onSuccess: () => {
      queryClient.setQueryData(["tasks"], (currentTasks) =>
        currentTasks
          ? currentTasks.filter((task) => task.id !== taskId)
          : currentTasks
      )
    },
    onError: (error) => {
      console.error("Erro ao deletar tarefa", error)
    },
  })
}
