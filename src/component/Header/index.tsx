import { LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../service/auth'
import { useState } from 'react'

function Header() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const navigateModalPage = () => {
    navigate('/adddiary')
  }

  const onPressLogOut = async (values: any) => {
    setLoading(true)
    try {
      await logout()
      navigate('/login')
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="header-div">
      <PageHeader
        className="site-page-header-ghost-wrapper"
        extra={[
          <>
            <p className="p">Log Diary </p>
            <LogoutOutlined onClick={onPressLogOut} rotate={270} className="logOut-btn"></LogoutOutlined>
          </>,
        ]}
      >
        <div className="top-bar">
          <PlusCircleOutlined onClick={navigateModalPage} />{' '}
          <Link to="/Projects" className="p1">
            {' '}
            Projects{' '}
          </Link>
        </div>
      </PageHeader>
    </div>
  )
}

export default Header
