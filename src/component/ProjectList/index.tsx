import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import './ProjectList.css'
import { createProject, deleteProject, getProjectsForUserId, updateProject } from '../../service/project'
import { GlobalContext } from '../../context'
import { useContext } from 'react'
import { CreateProjectModel, ProjectModel } from '../../model/Project'
import { UserModel } from '../../model/User'
import Loading from '../Loading'
import Project from '../Project'

export interface Props {
  user: UserModel
}

function ProjectList(props: Props) {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [projectName, setProjectName] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [projectListUpdated, setProjectListUpdated] = useState(false)
  const globalContext = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newProject: CreateProjectModel = {
      name: projectName,
      userId: globalContext.user?.userId!,
    }
    await createProject(newProject)
    setProjectListUpdated(!projectListUpdated)
    setProjectName('')
  }
  useEffect(() => {
    const getData = async () => {
      return await getProjectsForUserId(globalContext.user?.userId!)
    }
    setLoading(true)
    getData().then((data) => setProjects(data))
    setLoading(false)
  }, [globalContext.user?.userId, projectName, projectListUpdated])

  const onChange = (index: number, newValue: string) => {
    let existProjects = projects
    existProjects[index] = { ...existProjects[index], name: newValue }
    setProjects([...existProjects])
  }

  const onUpdate = async () => {
    try {
      const updatedProject = projects.find((child) => child.id === selectedProjectId)
      if (updatedProject && selectedProjectId) {
        await updateProject(selectedProjectId, { name: updatedProject.name })
        setSelectedProjectId('')
      }
    } catch (error) {}
  }

  const onDelete = async () => {
    try {
      const deletedProject = projects.find((child) => child.id === selectedProjectId)
      if (deletedProject && selectedProjectId) {
        await deleteProject(selectedProjectId)
        setSelectedProjectId('')
        setProjectListUpdated(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="project-list">
      <form onSubmit={handleSubmit} className="add-form">
        <Input
          placeholder="Add Project"
          bordered={true}
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
          className="input-form"
        />
        <Button className="btn" disabled={projectName.length < 1} type="primary" icon={<PlusCircleFilled />} htmlType="submit" />
      </form>
      {loading && <Loading />}
      {projects.map((project, index) => (
        <Project
          key={index}
          project={project}
          onChange={(value) => onChange(index, value)}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={() => setSelectedProjectId(project.id)}
          onEditMode={selectedProjectId === project.id}
        />
      ))}
    </div>
  )
}

export default ProjectList
