import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Upload } from 'antd'
import axios from 'axios'
import { startCase } from 'lodash'
import React, { useState, useEffect } from 'react'
import { useSWRConfig } from 'swr'
import { TableContentLoaderWithProps } from 'src/common/SkeletonLoader'
import { getBase64 } from 'src/utils'

interface propTypes {
  modalState: boolean
  setModalState: (params: boolean) => void
  action: string
  objId: string
}
interface imageTypes {
  base64: string
  name: string
  fileType: string
  fileSize: string
}
interface responseType {
  result: Record<string, unknown>
  message: string
}
interface formValueTypes {
  corp_name: string
  corp_mobile: string
  corp_address: string
  cs_hours: string
  product_name: string
  product_image: imageTypes
  ebook: boolean
  ebook_url: string
}

const CreateCorp = ({ modalState, setModalState, action, objId }: propTypes): JSX.Element => {
  const { mutate } = useSWRConfig()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [productImage, setProductImage] = useState<imageTypes>()
  const [isEbook, setIsEbook] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (objId && modalState) {
      axios.get(`http://localhost:5000/api/corp-srv/edit-corp/${objId}`).then(res => {
        const { result } = res.data as responseType
        form.setFieldsValue({ ...result, corp_name: action === 'duplicate' ? `${result.corp_name} - Copy` : result.corp_name })
        setLoading(false)
      })
    }
  }, [modalState, action, form, objId])

  const uploadProps = {
    beforeUpload: file => {
      const isPNG = file.type === 'image/png'
      if (!isPNG) {
        message.error(`${file.name} is not a png file`)
      }
      return isPNG || Upload.LIST_IGNORE
    },
    onChange: info => {
      getBase64(info.file.originFileObj, result =>
        setProductImage({
          base64: result,
          name: info.file.name,
          fileType: info.file.type,
          fileSize: info.file.size,
        }),
      )
    },
  }
  // hide modal
  const destroyModal = (): void => {
    setModalState(false)
    form.resetFields()
  }
  // form submit handler
  const submitFormHandler = (values: formValueTypes): void => {
    setBtnLoading(true)
    const payload = {
      ...values,
      product_image: productImage,
    }
    try {
      if (action === 'edit') {
        axios.patch(`http://localhost:5000/api/corp-srv/update-corp/${objId}`, payload)
        mutate('http://localhost:5000/api/corp-srv/corp-list', true)
      } else {
        axios.post('http://localhost:5000/api/corp-srv/create-corp', payload)
        mutate('http://localhost:5000/api/corp-srv/corp-list', true)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      setBtnLoading(false)
      destroyModal()
    }
  }

  return (
    <Modal
      title={`${startCase(action)} Corp.`}
      onCancel={destroyModal}
      centered
      width={500}
      open={modalState}
      footer={[
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          disabled={btnLoading}
          loading={btnLoading}
          onClick={() => form.submit()}
        >
          Save
        </Button>,
        <Button key="back" onClick={destroyModal}>
          Cancel
        </Button>,
      ]}
    >
      {loading ? (
        <>
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} />
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={submitFormHandler}>
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
            <Col span={12}>
              <Form.Item label="Support Number" name="corp_mobile">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Support Email" name="corp_email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Corp Address" name="corp_address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="CS Hours" name="cs_hours">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="mb-1" name="ebook" valuePropName="checked">
                <Checkbox onChange={e => setIsEbook(e.target.checked)}>Ebook</Checkbox>
              </Form.Item>
              {isEbook && (
                <Form.Item name="ebook_url">
                  <Input placeholder="Enter ebook URL" />
                </Form.Item>
              )}
            </Col>
            <Col span={24}>
              <Form.Item label="Brand Logo" name="product_image" valuePropName="file">
                <Upload {...uploadProps} className="d-block" maxCount={1}>
                  <Button className="w-100" icon={<UploadOutlined />}>
                    Upload png only
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  )
}

export default CreateCorp
