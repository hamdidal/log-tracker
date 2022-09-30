import React, { useContext } from 'react'
import ProjectHeader from '../../component/ProjectHeader'
import ProjectList from '../../component/ProjectList'
import { GlobalContext } from '../../context'

const ProjectPage = () => {
  const { user } = useContext(GlobalContext)
  return (
    <div>
      <ProjectHeader />
      {user && <ProjectList user={user} />}
    </div>
  )
}

export default ProjectPage
