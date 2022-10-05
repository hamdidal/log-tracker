import { LogoutOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../service/auth'

function Header() {
  const navigate = useNavigate()
  
  const toHome = async (values: any) => {
      navigate('/')
  }

  const onPressLogOut = async (values: any) => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
    } finally {
    }
  }

  return (
    <div className="header-div">
      <PageHeader
        className="site-page-header-ghost-wrapper"
        extra={[
          <>
            <p onClick={toHome} className="p">LogDiary </p>
            <LogoutOutlined onClick={onPressLogOut} rotate={270} className="logOut-btn"></LogoutOutlined>
          </>
        ]}
      ></PageHeader>
    </div>
  )
}

export default Header
