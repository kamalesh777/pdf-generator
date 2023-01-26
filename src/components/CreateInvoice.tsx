import { UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, Modal, Row, Upload } from 'antd'
import React, { useState } from 'react'

interface propTypes {
  modalState: boolean
  setModalState: (params: boolean) => void
}

const CreateInvoice = ({ modalState, setModalState }: propTypes): JSX.Element => {
  const [form] = Form.useForm()
  const [loading] = useState<boolean>(false)

  const uploadProps = {
    beforeUpload: file => {
      const isPNG = file.type === 'image/png'
      if (!isPNG) {
        message.error(`${file.name} is not a png file`)
      }
      return isPNG || Upload.LIST_IGNORE
    },
    onChange: info => {
      console.log(info.fileList)
    },
  }
  const destroyModal = (): void => {
    setModalState(false)
  }
  return (
    <Modal
      title="Create Corp."
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
            <Form.Item label="Corp Name" name="corp_name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Product Name" name="product_name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Corp Address" name="corp_address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Support Number" name="corp_support">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Support Email" name="corp_email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="CS Hours" name="cs_hours">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Brand Logo" valuePropName="fileList">
          <Upload {...uploadProps} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload png only</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateInvoice
