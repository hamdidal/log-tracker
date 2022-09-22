import React, { useContext, useEffect, useState } from 'react'
import Header from '../component/Header'
import Loading from '../component/Loading'
import { GlobalContext } from '../context'
import { LogModel } from '../model/Log'
import { getLogsForUserId } from '../service/log'
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
    getData().then((data) => setLogs(data))
    setLoading(false)
  }, [globalContext.user?.userId])
  return (
    <div className="home-page">
      {loading && <Loading />}
      <Header />
      <div className="container">
        <div className="headlines">
          {logs.map((log) => {
            return  <>
            <p>{log.projectId}</p>
            <p>{log.description}</p>
            <p>{log.start}</p>
            <p>{log.end}</p>
            <p>{log.difference}</p>
          </>
          }) }
        </div>
      </div>
    </div>
  )
}
