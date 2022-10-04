import { LogoutOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../service/auth'
import { useState } from 'react'

function Header() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

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
            <p className="p">LogDiary </p>
            <LogoutOutlined onClick={onPressLogOut} rotate={270} className="logOut-btn"></LogoutOutlined>
          </>,
        ]}
      ></PageHeader>
    </div>
  )
}

export default Header
