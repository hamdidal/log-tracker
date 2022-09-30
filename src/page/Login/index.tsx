import { Button, Form, Input, notification } from 'antd'
import React, { useState, useContext } from 'react'
import 'antd/dist/antd.min.css'
import './Login.css'
import { login } from '../../service/auth'
import { Formik } from 'formik'
import * as YUP from 'yup'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema: any = () => {
  return YUP.object().shape({
    email: YUP.string().email('Email is invalid').required('Email is required'),
    password: YUP.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  })
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 100 },
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toRegisterPage = () => {
    navigate('/register')
  }

  const globalContext = useContext(GlobalContext)

  const onPressLogin = async (values: any) => {
    setLoading(true)
    try {
      const res = await login(values.email, values.password)
      globalContext.setUser({
        userId: res.user.uid,
        userName: res.user.email || undefined,
      })
      navigate('/')
    } catch (e) {
      notification.open({
        message: 'Login Error',
        type: 'error',
        description: 'Email or password is wrong!',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onPressLogin} validationSchema={validationSchema} validateOnChange={true}>
      {({ errors, touched, handleChange, handleSubmit, handleBlur }) => (
        <Form className="loginform" {...layout}>
          <div className="titles-top">Log Tracker</div>
          <div className="titles-top">Login</div>
          {/* {loading && <Loading />} */}
          <Form.Item validateStatus={errors.email && touched.email ? 'error' : 'success'}>
            <Input className="email" type="email" name="email" placeholder="Email Address" onChange={handleChange} onBlur={handleBlur} />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </Form.Item>
          <Form.Item validateStatus={errors.password && touched.password ? 'error' : 'success'}>
            <Input
              className="password"
              autoComplete="new-password"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </Form.Item>
          <Form.Item className="button">
            <Button color="primary" block onClick={() => handleSubmit()}>
              Login
            </Button>
            <div className="register" onClick={toRegisterPage}>
              Don't have an account? Request now!
            </div>
          </Form.Item>
        </Form>
      )}
    </Formik>
  )
}
export default Login
