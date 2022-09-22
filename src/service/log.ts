import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { CreateLogModel, LogModel } from '../model/Log'

export const createLog = async (log: CreateLogModel): Promise<string> => {
  const ref = collection(db, 'diaryLog')
  const createdLog = await addDoc(ref, log)
  return createdLog.id
}

export const getLogsForUserId = async (userId: string) => {
    const q = query(collection(db, 'diaryLog'), where('userId', '==', userId))
  
    const querySnapshot = await getDocs(q)
    const res: LogModel[] = []
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      const data = {
        description: docData.description,
        difference: docData.difference,
        start: docData.start,
        end: docData.end,
        projectId: docData.projectId,
        userId: docData.id,
        id: doc.id
      }
      res.push(data)
    })
    return res
  }
