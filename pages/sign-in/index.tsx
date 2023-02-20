import { Button, Card, Form, Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import { API_BASE_URL, IMAGE_HOST_NAME } from '@/constant/ApiConstant'
import useAuth from '@/hooks/useAuth'

const SignIn: React.FC = () => {
  const { login, loading } = useAuth()

  const onFinish = (values: { username: string; password: string }): void => {
    login(`${API_BASE_URL}/api/user-srv/login`, values)
  }

  return (
    <div className="login-bg">
      <Card style={{ width: 400 }}>
        <div className="my-3">
          <Image src={`${IMAGE_HOST_NAME}/pdf-generator/logo/logo-color.webp`} alt="pdf-creator" width="150" height="55" />
        </div>
        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SignIn
