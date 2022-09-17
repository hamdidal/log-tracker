import React, { useContext } from 'react'
import ProjectHeader from '../component/ProjectHeader'
import ProjectList from '../component/ProjectList'
import { GlobalContext } from "../context"

const ProjectPage = () => {
  const globalContext = useContext(GlobalContext);
  return (
    <div>
      <ProjectHeader/>
      { globalContext.user && <ProjectList user={globalContext.user}/> }
    </div>
  )
}

export default ProjectPage