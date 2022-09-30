import { FC, Fragment, ReactNode, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context'
import { onAuthChange } from '../../service/auth'

interface AuthProps {
  children: ReactNode
}
const Auth: FC<AuthProps> = ({ children }) => {
  const { user, setUser } = useContext(GlobalContext)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthChange((authUser) => {
      if (authUser === null) {
        navigate('/login')
      } else {
        setUser({ userName: authUser.displayName ?? '', userId: authUser.uid ?? '' })
        navigate('/')
      }
    })
  }, [user, setUser, navigate])
  return <Fragment>{children}</Fragment>
}

export default Auth
