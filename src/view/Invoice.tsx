import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import CreateInvoice from '@/components/CreateInvoice'
import InvoiceTable from '@/components/InvoiceTable'

const Invoice = (): JSX.Element => {
  const [modalState, setModalState] = useState<boolean>(false)
  return (
    <Card>
      <Row className="mb-4" gutter={12} justify="space-between">
        <Col span={10}>
          <Input suffix={<SearchOutlined />} allowClear />
        </Col>
        <Col span={14} className="text-right">
          <Button onClick={() => setModalState(true)} type="primary">
            Create Invoice
          </Button>
        </Col>
      </Row>
      <CreateInvoice {...{ modalState, setModalState }} />
      <InvoiceTable />
    </Card>
  )
}

export default Invoice
