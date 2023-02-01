import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import DeleteModal from '@/common/DeleteModal'
import CorpTable from '@/components/CopTable'
import CreateCorp from '@/components/CreateCorp'
// eslint-disable-next-line no-duplicate-imports
import type { MenuProps } from 'antd'

const Corp = (): JSX.Element => {
  const [modalState, setModalState] = useState<boolean>(false)
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [objId, setObjId] = useState<string>('')

  const actionMenu: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
      onClick: () => {
        setModalState(true)
        setAction('edit')
      },
    },
    {
      label: 'Duplicte',
      key: 'duplicate',
      onClick: () => {
        setModalState(true)
        setAction('duplicate')
      },
    },
    {
      label: <strong className="text-danger">Delete</strong>,
      key: 'delete',
      onClick: () => setDeleteModalState(true),
    },
  ]

  return (
    <Card>
      <Row className="mb-4" gutter={12} justify="space-between">
        <Col span={8}>
          <Input suffix={<SearchOutlined />} placeholder="Search by corp name..." allowClear />
        </Col>
        <Col span={16} className="text-right">
          <Button
            onClick={() => {
              setAction('new')
              setModalState(true)
            }}
            type="primary"
          >
            Create Corp
          </Button>
        </Col>
      </Row>
      <CreateCorp {...{ modalState, setModalState, action, objId }} />
      <CorpTable {...{ actionMenu, setObjId }} />
      <DeleteModal
        width={400}
        {...{
          deleteModalState,
          setDeleteModalState,
          API_URL: `http://localhost:5000/api/corp-srv/delete-corp/${objId}`,
          MUTATE_URL: `http://localhost:5000/api/corp-srv/corp-list`,
        }}
      >
        <p className="my-0 text-danger">*All assigned invoices will be delete including this corp.</p>
      </DeleteModal>
    </Card>
  )
}

export default Corp
