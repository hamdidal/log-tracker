import { CloseCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { Select, Button, TimePicker } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context'
import { createLog } from '../../service/log'
import { getProjectsForUserId } from '../../service/project'
import './DiaryBox.css'
import { ProjectModel } from '../../model/Project'
import { CreateLogModel } from '../../model/Log'

export const DiaryBox = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [description, setDescription] = useState('')
  const [difference, setDifference] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [projectId, setProjectId] = useState('')
  const globalContext = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newLog: CreateLogModel = {
      description: description,
      difference: difference,
      start: start,
      end: end,
      userId: globalContext.user?.userId!,
      projectId: projectId,
    }
    await createLog(newLog)
    setDescription('')
    setDifference('')
    navigate('/')
  }

  useEffect(() => {
    const getData = async () => {
      return await getProjectsForUserId(globalContext.user?.userId!)
    }
    setLoading(true)
    getData().then((data) => setProjects(data))
    setLoading(false)
  }, [globalContext.user?.userId])

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

  return (
    <form onSubmit={handleSubmit} className="form-diary">
      <h2 className="title-form-diary">Add Diary</h2>
      <h3 className="title-form">Project Name</h3>
      <Select onChange={handleChange} placeholder="Select your project" className="select-modal">
        {projects.map((doc) => (
          <Option key={doc.id} value={doc.id}>
            {doc.name}
          </Option>
        ))}
      </Select>
      <div className="description-diary">
        <h3 className="title-form">Description</h3>
        <TextArea
          className="description-input"
          placeholder="Please say something"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength={500}
        />
      </div>
      <div className="description-diary">
        <h3 className="title-form">Start Time</h3>
        <TimePicker.RangePicker className="time-diary" onChange={handleTimeChange} />
        {difference && <h3>Difference: {difference}</h3>}
      </div>
      <Button className="description-button" disabled={description.length < 1 && difference.length < 1} type="primary" htmlType="submit">
        <PlusCircleFilled />
      </Button>
      <Button className="cancel-button" disabled={description.length > 1} type="primary" onClick={toCancel}>
        <CloseCircleFilled />
      </Button>
    </form>
  )
}
