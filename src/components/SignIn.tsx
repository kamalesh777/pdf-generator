import { Button, Card, Form, Input } from 'antd'
import Cookie from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Axios from '@/axios'
import { API_BASE_URL, IMAGE_HOST_NAME } from '@/constant/ApiConstant'

const SignIn: React.FC = () => {
  const [accessToken] = useState(Cookie.get('auth_token'))
  const router = useRouter()

  // useEffect(() => {
  //   if (accessToken) {
  //     loginHandler(`${API_BASE_URL}/api/user-srv/sign-in`)
  //   }
  // }, [])

  const loginHandler = async (API_URL: string, formValues?: { username: string; password: string }): Promise<void> => {
    // const token = Cookies.get('auth_token')
    const user = formValues
    try {
      const response = await Axios.post(API_URL, user)
      router.replace('/')
      const data = response.data
      Cookie.set('auth_token', data.result)
      //   Cookies.set('auth_token', data.result, { expires: 7, secure: true, sameSite: 'strict' })
    } catch (err) {
      router.replace('/sign-in')
    }
  }
  const onFinish = async (values: { username: string; password: string }): Promise<void> => {
    loginHandler(`${API_BASE_URL}/api/user-srv/login`, values)
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
