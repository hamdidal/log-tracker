import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../../context'
import { deleteLog, getLog, updateLog } from '../../service/log'
import { getProjectsForUserId } from '../../service/project'
import './DiaryBox.css'
import { ProjectModel } from '../../model/Project'
import { UpdateLogModel } from '../../model/Log'
import { Select } from 'antd'
import UpdateLogDiary from '../../component/UpdateLog'
import Header from '../../component/Header'

export const UpdateDiary = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [description, setDescription] = useState('')
  const [difference, setDifference] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [projectId, setProjectId] = useState('')
  const globalContext = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null)

  const { id } = useParams()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const logUpdate: UpdateLogModel = {
      description: description,
      difference: difference,
      start: start,
      end: end,
      userId: globalContext.user?.userId!,
      projectId: projectId,
      id: id!,
    }
    await updateLog(id!, logUpdate)
    setDescription('')
    setDifference('')
    navigate('/')
  }

  useEffect(() => {
    const getProject = async () => {
      return await getProjectsForUserId(globalContext.user?.userId!)
    }
    setLoading(true)
    getProject().then((data) => setProjects(data))
    setLoading(false)
  }, [globalContext.user?.userId])

  useEffect(() => {
    const getLogs = async () => {
      return await getLog(id!)
    }
    setLoading(true)
    getLogs().then((data) => {
      setDescription(data.description)
      setDifference(data.difference)
      setEnd(data.end)
      setProjectId(data.projectId)
      setStart(data.start)
    })
    setLoading(false)
  }, [id])

  const { Option } = Select

  const handleTimeChange = (values: any) => {
    const startDate = new Date(values[0]._d)
    const endDate = new Date(values[1]._d)
    const diff = endDate.getTime() - startDate.getTime()
    const diffHrs = Math.floor((diff % 86400000) / 3600000)
    const diffMins = Math.floor(((diff % 86400000) % 3600000) / 60000)

    setDifference(`${diffHrs}:${diffMins}`)
    setStart(startDate.toLocaleString())
    setEnd(endDate.toLocaleString())
  }

  const handleChange = (value: string) => {
    setProjectId(value)
  }

  const navigate = useNavigate()

  const toCancel = () => {
    navigate('/')
  }
  const onDelete = async () => {
    try {
      const deletedLog = id
      if (deletedLog) {
        await deleteLog(deletedLog)
        setSelectedLogId('')
        navigate('/')
      }
    } catch (error) {}
  }
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="form-diary">
        <h2 className="title-form-diary">Update Log</h2>
        <h3 className="title-form">Project Name</h3>
        <Select value={projectId} onChange={handleChange} placeholder="Select your project" className="select-modal">
          {projects.map((doc) => (
            <Option key={doc.id} value={doc.id}>
              {doc.name}
            </Option>
          ))}
        </Select>
        <UpdateLogDiary
          description={description}
          setDescription={setDescription}
          difference={difference}
          handleTimeChange={handleTimeChange}
          onDelete={onDelete}
          toCancel={toCancel}
        />
      </form>
    </>
  )
}
