import { Button, Card, Form, Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import { IMAGE_HOST_NAME } from '@/constant/ApiConstant'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const SignIn: React.FC = () => (
  <div className="login-bg">
    <Card style={{ width: 400 }}>
      <div className="my-3">
        <Image src={`${IMAGE_HOST_NAME}/pdf-generator/logo/logo-color.png`} alt="pdf-creator" width="150" height="55" />
      </div>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
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

export default SignIn
