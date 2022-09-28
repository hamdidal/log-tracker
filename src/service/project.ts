import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { CreateProjectModel, ProjectModel, UpdateProjectModel } from '../model/Project'


export const getProject = async (id:string):Promise<ProjectModel> => {
  const ref = doc(db, "projects", id )
  const project = await getDoc(ref)
  const data = project.data()
  const res:ProjectModel = {
    name: data!.name,
    userId: data!.userId,
    id: id
  }
  return res
}

export const getProjectsForUserId = async (userId: string) => {
  const q = query(collection(db, 'projects'), where('userId', '==', userId))

  const querySnapshot = await getDocs(q)
  const res: ProjectModel[] = []
  querySnapshot.forEach((doc) => {
    const docData = doc.data()
    const data = {
      id: doc.id,
      name: docData.name,
      userId: docData.userId,
    }
    res.push(data)
  })
  return res
}

export const createProject = async (project: CreateProjectModel): Promise<string> => {
  const ref = collection(db, 'projects')
  const createdProject = await addDoc(ref, project)
  return createdProject.id
}
export const deleteProject = async (id: string) => {
  const deletedProject = await deleteDoc(doc(db, 'projects', id))
  return deletedProject
}
export const updateProject = async (id: string, project: UpdateProjectModel) => {
  const ref = doc(db, 'projects', id)
  const editedProject = await updateDoc(ref, { ...project })
  return editedProject
}

