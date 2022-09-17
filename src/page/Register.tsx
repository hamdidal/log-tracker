import { Button, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { register } from "../service/register";
import { Formik, Field, ErrorMessage } from "formik";
import * as YUP from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema: any = () => {
  return YUP.object().shape({
    email: YUP.string().required("Email is required").email("Email is invalid"),
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

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onPressRegister = async () => {
    setLoading(true);
    try {
      await register(email, password);
      navigate("/");
    } catch (e) {
      notification.open({
        message: "Register Error",
        type: "error",
        description: "Please provide all required information above!",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onPressRegister}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ dirty, errors, touched }) => (
        <Form className="loginform" {...layout}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Field
              className="email"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={(event: any) => setEmail(event.target.value)}
              value={email}
            />
            <ErrorMessage name="email" component="div" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please input your Password!",
              },
            ]}
          >
            <Field
              className="email"
              autoComplete="new-password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={(event: any) => setPassword(event.target.value)}
              value={password}
            />
            <ErrorMessage name="password" component="div" />
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
              onClick={onPressRegister}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
