import { ProjectModel } from "./Project"

export interface LogModel {
  description: string
  difference: string
  start: string
  end: string
  project: ProjectModel
  projectId: string
  userId: string
  id: string
}
export interface CreateLogModel {
  description: string
  difference: string
  start: string
  end: string
  projectId: string
  userId: string
}

export interface UpdateLogModel {
  description: string
  difference: string
  start: string
  end: string
  projectId: string
  userId: string
  id: string
}
