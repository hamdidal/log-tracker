import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import '../page/ProjectPage.css'
import { createProject, deleteProject, getProjectsForUserId, updateProject } from '../service/project'
import { GlobalContext } from '../context'
import { useContext } from 'react'
import { CreateProjectModel, ProjectModel } from '../model/Project'
import { UserModel } from '../model/User'
import Loading from './Loading'

export interface Props {
  user: UserModel
}

function ProjectList(props: Props) {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [projectName, setProjectName] = useState('')
  const [projectEditing, setProjectEditing] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
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
  }, [globalContext.user?.userId, projectName, projectListUpdated, projects])

  return (
    <div id="project-list">
      <form onSubmit={handleSubmit} className="add-form">
        <Input placeholder="Add Project" bordered={false} type="text" onChange={(e) => setProjectName(e.target.value)} value={projectName} />
        <Button disabled={projectName.length < 1} type="primary" icon={<PlusCircleFilled />} htmlType="submit" />
      </form>
      {loading && <Loading />}
      {projects.map((project, idx) => (
        <div key={idx} className="project">
          <div className="project-text">
            {project.id === projectEditing ? (
              <Input
                bordered={false}
                value={project.submit}
                placeholder={project.name}
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{project.name}</div>
            )}
          </div>
          <div>
            {project.id === projectEditing ? (
              <Button disabled={!editingText} onClick={() => updateProject}>
                Submit Edits
              </Button>
            ) : (
              <Button onClick={() => setProjectEditing(project.id)}>Edit</Button>
            )}
            <Button onClick={() => deleteProject(project.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectList
