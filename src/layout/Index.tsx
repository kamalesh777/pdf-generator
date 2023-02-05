import { Layout, Menu } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
          <Image
            src="https://ik.imagekit.io/g5zld5ryd/pdf-generator/logo/logo-color.png"
            alt="pdf-creator"
            width="150"
            height="55"
          />
        </div>
        <Menu items={menu} />
        <Footer className="fixed-to-bottom">
          Made by{' '}
          <a target="new" href="https://www.kammoskill.autos">
            Kamalesh Maity
          </a>
        </Footer>
      </Sider>
      <Layout className="main-layout">
        <Header className="header">Header</Header>
        <Content className="p-4">{children}</Content>
      </Layout>
    </Layout>
  )
}
export default LayoutWrapper
