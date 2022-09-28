import { Button, Form, notification } from 'antd'
import React, { useState } from 'react'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom'
import { register } from '../../service/register'
import { Formik, Field } from 'formik'
import * as YUP from 'yup'
import Loading from '../../component/Loading'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema: any = () => {
  return YUP.object().shape({
    email: YUP.string().required('Email is required').email('Email is invalid'),
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

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onPressRegister = async (values:any) => {
    setLoading(true)
    try {
      await register(values.email, values.password)
      navigate('/')
    } catch (e) {
      notification.open({
        message: 'Register Error',
        type: 'error',
        description: 'Please provide all required information above!',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onPressRegister} validationSchema={validationSchema} validateOnMount={true}>
      {({ errors, touched, handleChange, handleSubmit }) => (
        <Form className="loginform" {...layout}>
          {loading && <Loading />}
          <Form.Item label="Email" name="email">
            <Field
              className="email"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={handleChange}
              errors="lütfen bir mail adresi giriniz"
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Field
              className="email"
              autoComplete="new-password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </Form.Item>
          <Form.Item {...layout} name="remember" valuePropName="checked"></Form.Item>
          <Form.Item className="btn">
            <Button disabled={loading} color="primary" block onClick={() => handleSubmit()}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  )
}

export default Register
