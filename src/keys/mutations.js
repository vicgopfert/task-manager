export const taskMutationKeys = {
  add: () => ["add-task"],
  update: (taskId) => ["update-task", taskId],
  updateStatus: (taskId) => ["update-task-status", taskId],
  delete: (taskId) => ["delete-task", taskId],
}
