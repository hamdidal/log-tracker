export interface ProjectModel {
  submit: string 
  name: string
  userId: string | undefined
  id: string
}
export interface CreateProjectModel {
  name: string
  userId: string
}
export interface DeleteProjectModel {
  name: string
  userId: string
}
export interface UpdateProjectModel {
  name: string
  userId: string
}
