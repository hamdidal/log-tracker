import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { CreateLogModel, LogModel, UpdateLogModel } from '../model/Log'
import { ProjectModel } from '../model/Project'
import { getProject } from './project'

export const createLog = async (log: CreateLogModel): Promise<string> => {
  const ref = collection(db, 'diaryLog')
  const createdLog = await addDoc(ref, log)
  return createdLog.id
}

export const getLogsForUserId = async (userId: string) => {
  const q = query(collection(db, 'diaryLog'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  const res: LogModel[] = []
  const projectIds: string[] = []
  querySnapshot.forEach(async (doc) => {
    const docData = doc.data()
    projectIds.push(docData.projectId)
    const data = {
      description: docData.description,
      difference: docData.difference,
      start: docData.start,
      end: docData.end,
      projectId: docData.projectId,
      project: {} as ProjectModel,
      userId: docData.userId,
      id: doc.id,
    }
    res.push(data)
  })

  const projects: any[] = await Promise.all(
    projectIds.map((id) => {
      return new Promise(async (resolve: Function, reject: Function) => {
        const project = await getProject(id)
        resolve(project)
      })
    })
  )

  return res.map((r) => {
    return {
      ...r,
      project: projects.find((p: ProjectModel) => p.id === r.projectId),
    }
  })
}

export const updateLog = async (id: string, project: UpdateLogModel) => {
  const ref = doc(db, 'diaryLog', id)
  const editedProject = await updateDoc(ref, { ...project })
  return editedProject
}

export const getLog = async (id: string): Promise<LogModel> => {
  const ref = doc(db, 'diaryLog', id)
  const log = await getDoc(ref)
  const data = log.data() as LogModel
  const res: LogModel = {
    description: data.description,
    difference: data.difference,
    start: data.start,
    end: data.end,
    project: data.project,
    projectId: data.projectId,
    userId: data.userId,
    id: data.id,
  }
  return res
}

export const deleteLog = async (id: string) => {
  const deletedLog = await deleteDoc(doc(db, 'diaryLog', id))
  return deletedLog
}
