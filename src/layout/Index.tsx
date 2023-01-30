import { Layout, Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

const { Header, Footer, Sider, Content } = Layout
const LayoutWrapper = ({ children }): JSX.Element => {
  const menu = [
    {
      label: <Link href="corp-details">Company Details</Link>,
      key: 1,
    },
    {
      label: <Link href="invoice">Invoice Details</Link>,
      key: 2,
    },
  ]
  return (
    <Layout>
      <Sider className="sidebar" theme="light">
        <Menu items={menu} />
      </Sider>
      <Layout className="main-layout">
        <Header className="header">Header</Header>
        <Content className="p-4">{children}</Content>
        <Footer>
          Made by{' '}
          <a target="new" href="kammoskill.autos">
            Kamalesh Maity
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}
export default LayoutWrapper
