import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { CreateProjectModel, ProjectModel, UpdateProjectModel } from '../model/Project'

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
      submit: docData.string,
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
  const editedProject = await updateDoc(ref, id, project)
  return editedProject
}
