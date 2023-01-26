import { Layout, Menu } from 'antd'
import React from 'react'

const { Header, Footer, Sider, Content } = Layout
const menu = [
  {
    label: 'Company Details',
    value: 'company_details',
    key: 1,
  },
  {
    label: 'Invoice Details',
    value: 'invoice_details',
    key: 2,
  },
]
const LayoutWrapper = ({ children }): JSX.Element => (
  <Layout>
    <Sider className="sidear" theme="light">
      <Menu items={menu} />
    </Sider>
    <Layout>
      <Header className="header">Header</Header>
      <Content className="p-4">{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
)
export default LayoutWrapper
