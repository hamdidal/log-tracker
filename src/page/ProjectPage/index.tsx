import React, { useContext } from 'react'
import Header from '../../component/Header'
import ProjectList from '../../component/ProjectList'
import { GlobalContext } from '../../context'

const ProjectPage = () => {
  const { user } = useContext(GlobalContext)
  return (
    <div>
      <Header />
      {user && <ProjectList user={user} />}
    </div>
  )
}

export default ProjectPage
