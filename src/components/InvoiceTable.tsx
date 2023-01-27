import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { TableContentLoaderWithProps } from 'src/common/SkeletonLoader'
import { EMPTY_PLACEHOLDER } from '@/constant/ApiConstant'
// eslint-disable-next-line no-duplicate-imports
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: string
  name: string
  ebook: boolean
  llc: string
  url: string
}
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    url: 'http:localhost:3000',
    llc: 'hello llc',
    ebook: true,
  },
  {
    key: '2',
    name: 'John Ccena',
    url: 'http:localhost:3000',
    llc: 'hello llc',
    ebook: true,
  },
  {
    key: '3',
    name: 'Raul Brown',
    url: '',
    llc: 'hello llc',
    ebook: false,
  },
  {
    key: '4',
    name: 'John kelly',
    url: 'http:localhost:3000',
    llc: 'hello llc',
    ebook: true,
  },
]

const InvoiceTable = (): JSX.Element => {
  const [contentLoader, setContentLoader] = useState<boolean>(true)
  const [tableData, setTableData] = useState<DataType[]>([])

  useEffect(() => {
    setTimeout(() => {
      setContentLoader(false)
      // setTableData(data)
    }, 2200)
  }, [])

  const actionMenu: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
    },
    {
      label: 'Duplicte',
      key: 'duplicate',
    },
    {
      label: <strong className="text-danger">Delete</strong>,
      key: 'delete',
    },
  ]
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '20%',
      render: text => <a>{text}</a>,
    },
    {
      title: 'LLC',
      dataIndex: 'llc',
      key: 'llc',
      ellipsis: true,
      width: '20%',
    },
    {
      title: 'Ebook',
      dataIndex: 'ebook',
      key: 'ebook',
      ellipsis: true,
      width: '15%',
      render: (_, { ebook }) => <Tag color={ebook ? '#87d068' : 'grey'}>{ebook ? 'TRUE' : 'FALSE'}</Tag>,
    },
    {
      title: 'URL',
      key: 'url',
      dataIndex: 'url',
      ellipsis: true,
      width: '35%',
      render: (_, { url }) => <span>{!!url ? url : EMPTY_PLACEHOLDER}</span>,
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <div className="d-flex justify-content-end">
          <Dropdown menu={{ items: actionMenu }} trigger={['click']}>
            <Button className="p-0" type="link" onClick={e => e.preventDefault()}>
              <EllipsisOutlined rotate={90} />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ]

  const loader = contentLoader ? <TableContentLoaderWithProps columnWidth={[18, 20, 15, 40, 8]} /> : <p>Empty content</p>
  return <Table columns={columns} locale={{ emptyText: loader }} dataSource={tableData} />
}

export default InvoiceTable
