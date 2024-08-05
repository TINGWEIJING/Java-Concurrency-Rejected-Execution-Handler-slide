export interface Task {
  id: number // zero based
}

export interface Thread {
  id: number // zero based
  taskId?: number
}
