import { CloudDownloadOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Dropdown, Table } from 'antd'
import router from 'next/router'
import React from 'react'
import { EMPTY_PLACEHOLDER } from '@/constant/ApiConstant'
import useFetch from '@/hooks/useFetch'
import type { ColumnsType } from 'antd/es/table'
import { TableContentLoaderWithProps } from 'src/common/SkeletonLoader'

interface DataType {
  _id: string
  key: string
  order_id: string
  order_name: string
  order_email: string
  corp_id: string
  corp_details: {
    label: string
    value: string
  }
  card_number: string
}

const InvoiceTable = ({ actionMenu, setObjId }): JSX.Element => {
  const { data, isLoading } = useFetch('http://localhost:5000/api/invoice-srv/invoice-list')

  const columns: ColumnsType<DataType> = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      ellipsis: true,
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'order_name',
      key: 'order_name',
      ellipsis: true,
      width: '18%',
    },
    {
      title: 'Email',
      dataIndex: 'order_email',
      key: 'order_email',
      ellipsis: true,
      width: '18%',
    },
    {
      title: 'Corp Name',
      key: 'corp_details',
      dataIndex: 'corp_details',
      ellipsis: true,
      width: '20%',
      render: (_, { corp_details }) => <span>{!!corp_details ? corp_details.label : EMPTY_PLACEHOLDER}</span>,
    },
    {
      title: 'Credit Card',
      key: 'card_number',
      dataIndex: 'card_number',
      ellipsis: true,
      width: '15%',
      render: (_, { card_number }) => <span>{!!card_number ? card_number : EMPTY_PLACEHOLDER}</span>,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <div className="action-menu">
          <EyeOutlined onClick={() => router.push(`/invoice-bill/${record._id}`)} />
          <CloudDownloadOutlined className="ms-3" />
        </div>
      ),
    },
    {
      title: '',
      key: 'dot',
      render: (_, record) => (
        <div className="d-flex justify-content-end">
          <Dropdown menu={{ items: actionMenu }} trigger={['click']}>
            <Button className="p-0" type="link" onClick={e => e.preventDefault()}>
              <EllipsisOutlined rotate={90} onClick={() => setObjId(record._id)} />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ]
  const loader = !isLoading ? <TableContentLoaderWithProps columnWidth={[9, 17, 17, 25, 20, 10]} /> : <p>Empty content</p>
  return (
    <>
      <Table columns={columns} locale={{ emptyText: loader }} dataSource={data?.result} />
    </>
  )
}

export default InvoiceTable
