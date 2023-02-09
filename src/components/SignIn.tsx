import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const SignIn: React.FC = () => (
  <Form
    name="basic"
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout="vertical"
  >
    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
      <Input />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
      <Input.Password />
    </Form.Item>

    {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember this device for 30 days</Checkbox>
    </Form.Item> */}

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)

export default SignIn
