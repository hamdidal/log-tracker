import { Button, Form, notification } from "antd";
import React, { useState, useContext } from "react";
import "antd/dist/antd.css";
import "./Login.css";
import { login } from "../service/auth";
import { Formik, Field } from "formik";
import * as YUP from "yup";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema: any = () => {
  return YUP.object().shape({
    email: YUP.string().email("Email is invalid").required("Email is required"),
    password: YUP.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 100 },
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext)

  const onPressLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await login(values.email , values.password);
      globalContext.setUser({
        userId:res.user.uid, 
        userName:res.user.email || undefined
      })
      console.log("afterlogin", globalContext.user)
      navigate("/");
    } catch (e) {
      notification.open({
        message: "Login Error",
        type: "error",
        description: "Email or password is wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onPressLogin}
      validationSchema={validationSchema}
      validateOnChange={true}
    >
      {({ errors, touched, handleChange, handleSubmit }) => (
        <Form className="loginform" {...layout}>
          <Form.Item label="Email" name="email">
            <Field
              className="email"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={handleChange}
              errors="lütfen mail adresinizi"
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Field
              className="password"
              autoComplete="new-password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </Form.Item>
          <Form.Item
            {...layout}
            name="remember"
            valuePropName="checked"
          ></Form.Item>
          <Form.Item className="btn">
            <Button
              disabled={loading}
              color="primary"
              block
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
            or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
