import { Button, Form, notification } from 'antd'
import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { register } from '../../service/auth'
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

  const toLoginPage = () => {
    navigate('/login')
  }

  const onPressRegister = async (values: any) => {
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
      {({ errors, touched, handleChange, handleSubmit, handleBlur }) => (
        <Form className="loginform-reg" {...layout}>
          <div>Register Form</div>
          {loading && <Loading />}
          <Form.Item validateStatus={errors.email && touched.email ? 'error' : 'success'}>
            <Field className="email-reg" type="email" name="email" placeholder="Enter Email Address" onChange={handleChange} onBlur={handleBlur} />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </Form.Item>
          <Form.Item validateStatus={errors.password && touched.password ? 'error' : 'success'}>
            <Field
              className="password-reg"
              autoComplete="new-password"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </Form.Item>
          <Form.Item className="btn-form-reg">
            <Button className="btn-reg" color="primary" block onClick={() => handleSubmit()}>
              Sign In
            </Button>
          </Form.Item>
          <div className="back-log" onClick={toLoginPage}>
            If you have an account, please Login!
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Register
