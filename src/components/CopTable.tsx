import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { API_URL, EMPTY_PLACEHOLDER } from '@/constant/ApiConstant'
import useFetch from '@/hooks/useFetch'
import type { ColumnsType } from 'antd/es/table'
import { TableContentLoaderWithProps } from 'src/common/SkeletonLoader'

interface DataType {
  _id: string
  key: string
  product_name: string
  ebook: boolean
  corp_name: string
  ebook_url: string
}

const CorpTable = ({ actionMenu, setObjId, searchValue }): JSX.Element => {
  const [listUrl, setListUrl] = useState<string>('${API_URL}/api/corp-srv/corp-list')
  const { data, isLoading } = useFetch(listUrl)

  useEffect(() => {
    setListUrl(`${API_URL}/api/corp-srv/corp-list?search=${searchValue}`)
  }, [searchValue])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Corp Name',
      dataIndex: 'corp_name',
      key: 'corp_name',
      ellipsis: true,
      width: '20%',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      ellipsis: true,
      width: '20%',
      render: (_, record) => (record.product_name ? record.product_name : EMPTY_PLACEHOLDER),
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
      key: 'ebook_url',
      dataIndex: 'ebook_url',
      ellipsis: true,
      width: '35%',
      render: (_, { ebook_url }) => <span>{!!ebook_url ? ebook_url : EMPTY_PLACEHOLDER}</span>,
    },
    {
      title: '',
      key: 'action',
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

  const loader = isLoading ? <TableContentLoaderWithProps columnWidth={[18, 20, 15, 40, 8]} /> : <p>Empty content</p>
  return (
    <Table rowKey="_id" columns={columns} locale={{ emptyText: loader }} className="scroll-table" dataSource={data?.result} />
  )
}

export default CorpTable
