import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import CorpTable from '@/components/CopTable'
import CreateCorp from '@/components/CreateCorp'

const Corp = (): JSX.Element => {
  const [modalState, setModalState] = useState<boolean>(false)
  return (
    <Card>
      <Row className="mb-4" gutter={12} justify="space-between">
        <Col span={8}>
          <Input suffix={<SearchOutlined />} allowClear />
        </Col>
        <Col span={16} className="text-right">
          <Button onClick={() => setModalState(true)} type="primary">
            Create Corp
          </Button>
        </Col>
      </Row>
      <CreateCorp {...{ modalState, setModalState }} />
      <CorpTable />
    </Card>
  )
}

export default Corp
