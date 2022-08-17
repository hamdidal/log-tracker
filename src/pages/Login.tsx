import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import "./Login.css"

const Login: React.FC = () => {


  return (
    <Form className='form'
>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item >
        <Button type="primary"  htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login