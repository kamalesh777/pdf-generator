import { GithubOutlined, LinkedinOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IMAGE_HOST_NAME } from '@/constant/ApiConstant'

const { Header, Footer, Sider, Content } = Layout
const LayoutWrapper = ({ children }): JSX.Element => {
  const menu = [
    {
      label: <Link href="/corp-details">Company Details</Link>,
      key: 1,
    },
    {
      label: <Link href="/invoice">Invoice Details</Link>,
      key: 2,
    },
  ]
  return (
    <Layout>
      <Sider className="sidebar" theme="light">
        <div className="logo">
          <Image src={`${IMAGE_HOST_NAME}/pdf-generator/logo/logo-color.png`} alt="pdf-creator" width="150" height="55" />
        </div>
        <Menu items={menu} />
        <Footer className="fixed-to-bottom">
          <p>
            Made by{' '}
            <a target="new" href="https://www.kammoskill.autos">
              Kamalesh Maity
            </a>
          </p>
          <div className="footer-icon">
            <Link href="https://www.linkedin.com/in/kamalesh-maity-46679586/">
              <LinkedinOutlined />
            </Link>
            <Link href="https://github.com/kamalesh777">
              <GithubOutlined />
            </Link>
          </div>
        </Footer>
      </Sider>
      <Layout className="main-layout">
        <Header className="header d-flex align-items-center justify-content-between">
          <p>
            <UserOutlined className="user-icon" />
            Kamalesh Maity
          </p>
          <Button type="primary" icon={<PoweroffOutlined />} className="ms-2" danger>
            Logout
          </Button>
        </Header>
        <Content className="p-4">{children}</Content>
      </Layout>
    </Layout>
  )
}
export default LayoutWrapper
