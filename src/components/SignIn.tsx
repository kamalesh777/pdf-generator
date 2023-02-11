import { Button, Card, Form, Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import Cookies from 'universal-cookie'
import Axios from '@/axios'
import { API_BASE_URL, IMAGE_HOST_NAME } from '@/constant/ApiConstant'

const SignIn: React.FC = () => {
  const cookies = new Cookies()

  const onFinish = (values: any) => {
    Axios.post(`${API_BASE_URL}/api/user-srv/login`, values).then(res => {
      console.log(res.data)
    })
  }
  return (
    <div className="login-bg">
      <Card style={{ width: 400 }}>
        <div className="my-3">
          <Image src={`${IMAGE_HOST_NAME}/pdf-generator/logo/logo-color.png`} alt="pdf-creator" width="150" height="55" />
        </div>
        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember this device for 30 days</Checkbox>
    </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SignIn
