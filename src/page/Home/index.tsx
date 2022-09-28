import { Card } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../component/Header'
import Loading from '../../component/Loading'
import { GlobalContext } from '../../context'
import { LogModel } from '../../model/Log'
import { getLogsForUserId } from '../../service/log'
import './Home.css'

export const Home = () => {
  const [logs, setLogs] = useState<LogModel[]>([])
  const globalContext = useContext(GlobalContext)
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      return await getLogsForUserId(globalContext.user?.userId!)
    }
    setLoading(true)
    getData().then((data) => {setLogs(data);  console.log("data",data)})
    setLoading(false)
  }, [globalContext.user?.userId])
  
  const navigate = useNavigate()
  const toUpdate = (id:string) =>{
    navigate ("/updatediary/"+id)
  }

  return (
    <div className="home-page">
      {loading && <Loading />}
      <Header />
      <div className="container">
      <div className='titles'>        
          <div className='title'>Project</div>
          <div className='title'>Description</div>
          <div className='title'>Start Time</div>
          <div className='title'>End Time</div>
          <div className='title'>Total Time</div>
      </div>
      <div className="headlines">
          {logs.map((log) => {
            return (
              <div onDoubleClick={()=> toUpdate(log.id)}>
                <Card.Grid className='log-table'>
                <div className='table-data'>{log.project.name}</div>
                <div className='table-data'>{log.description}</div>
                <div className='table-data'>{log.start}</div>
                <div className='table-data'>{log.end}</div>
                <div className='table-data'>{log.difference} </div>
                </Card.Grid>
              </div>
            )
          })}
      </div>
      </div>
    </div>
  )
}
