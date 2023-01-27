import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Table, Tag } from 'antd'
import React from 'react'
import { EMPTY_PLACEHOLDER } from '@/constant/ApiConstant'
import useFetch from '@/hooks/useFetch'
// eslint-disable-next-line no-duplicate-imports
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableContentLoaderWithProps } from 'src/common/SkeletonLoader'

interface DataType {
  key: string
  name: string
  ebook: boolean
  llc: string
  url: string
}

const CorpTable = (): JSX.Element => {
  const { data, isLoading } = useFetch('http://localhost:5000/api/invoice-srv/invoice-list')

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

  const loader = isLoading ? <TableContentLoaderWithProps columnWidth={[18, 20, 15, 40, 8]} /> : <p>Empty content</p>
  return <Table columns={columns} locale={{ emptyText: loader }} dataSource={data?.result} />
}

export default CorpTable
