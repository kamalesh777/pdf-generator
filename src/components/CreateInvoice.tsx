import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'

interface propTypes {
  modalState: boolean
  setModalState: (params: boolean) => void
}
interface corpListType {
  value: string
  label: string
}

const corpsss = [
  {
    label: 'Auroara llc',
    value: '2242434rw352',
  },
  {
    label: 'Aritra llc',
    value: '22424hj3b252',
  },
  {
    label: 'Kamalesh llc',
    value: '224234bhb252',
  },
  {
    label: 'Auroara llc',
    value: '2246769hb252',
  },
]

const CreateInvoice = ({ modalState, setModalState }: propTypes): JSX.Element => {
  const [form] = Form.useForm()
  const [loading] = useState<boolean>(false)
  const [corpList, setCorpList] = useState<corpListType[]>([])

  useEffect(() => {
    setCorpList(corpsss)
  }, [])

  const destroyModal = (): void => {
    setModalState(false)
  }
  return (
    <Modal
      title="Create Invoice."
      onCancel={destroyModal}
      centered
      width={500}
      open={modalState}
      footer={[
        <Button key="submit" htmlType="submit" type="primary" loading={loading} onClick={destroyModal}>
          Save
        </Button>,
        <Button key="back" onClick={destroyModal}>
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="User Name" name="user_name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Product Name" name="product_name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="user_email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone" name="user_phone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Order ID" name="order_id">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tracking ID" name="tracking_id">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Address" name="user_address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Product Price" name="product_price">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Shipping Price" name="shipping_price">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Card Number" name="card_number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Order Date" name="order_date">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Select Corp" name="corp_id">
              <Select options={corpList} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CreateInvoice
