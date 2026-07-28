export const taskQueryKeys = {
  getAll: () => ["tasks"],
  getById: (taskId) => ["task", taskId],
}

export const waterQueryKeys = {
  get: () => ["water"],
}
