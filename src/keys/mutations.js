export const taskMutationKeys = {
  add: () => ["add-task"],
  update: (taskId) => ["update-task", taskId],
  updateStatus: (taskId) => ["update-task-status", taskId],
  delete: (taskId) => ["delete-task", taskId],
  clear: () => ["clear-tasks"],
}

export const waterMutationKeys = {
  update: () => ["update-water"],
}
