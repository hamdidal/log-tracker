import React, { useEffect, useState } from 'react'
import { Button, Card, Input } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import './ProjectList.css'
import { createProject, deleteProject, getProjectsForUserId, updateProject } from '../../service/project'
import { GlobalContext } from '../../context'
import { useContext } from 'react'
import { CreateProjectModel, ProjectModel } from '../../model/Project'
import { UserModel } from '../../model/User'
import Loading from '../Loading'

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
    let existProjects = projects;
    existProjects[index] = { ...existProjects[index], name: newValue };
    setProjects([ ...existProjects ]);
  };

  const onUpdate = async () => {
    try {
      const updatedProject = projects.find((child) => child.id === selectedProjectId);
      if (updatedProject && selectedProjectId) {
        await updateProject(selectedProjectId, { name: updatedProject.name });
        console.log("onupdate", onUpdate)
        setSelectedProjectId("")
      }
    } catch (error) {
    }
  };

  return (
    <div className="project-list">
      <form onSubmit={handleSubmit} className="add-form">
        <Input placeholder="Add Project" bordered={true} type="text" onChange={(e) => setProjectName(e.target.value)} value={projectName} className="input-form" />
        <Button className='btn' disabled={projectName.length < 1} type="primary" icon={<PlusCircleFilled />} htmlType="submit" />
      </form>
      {loading && <Loading />}
      {projects.map((project, index) => (
        <Card.Grid key={index} className="projects">
          <div className="project">
            {project.id === selectedProjectId ? (
              <Input
                bordered={false}
                value={project.name} 
                placeholder={project.name}
                type="text"
                onChange={(e) => onChange(index, e.target.value)}
              />
            ) : (
              <div>{project.name}</div>
            )}
          </div>
          <div>
            {project.id === selectedProjectId ? (
              <Button className='edit-btn' onClick={onUpdate}>
                Submit Edits
              </Button>
            ) : (
              <Button className='edit-btn' onClick={() => setSelectedProjectId(project.id)}>Edit</Button>
            )}
            <Button className='delete-btn' onClick={() => deleteProject(project.id)}>Delete</Button>
          </div>
        </Card.Grid>
      ))}
    </div>
  )
}

export default ProjectList
