import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Upload } from 'antd'
import axios from 'axios'
import { startCase } from 'lodash'
import React, { useState, useEffect } from 'react'
import { mutate } from 'swr'
import ToastMessage from '@/common/ToastMessage'
import { DUPLICATE_VAR, EDIT_VAR } from '@/constant/ApiConstant'
import { getBase64 } from '@/utils/commonFunc'
import { TableContentLoaderWithProps } from 'src/common/SkeletonLoader'

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
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [productImage, setProductImage] = useState<imageTypes>()
  const [isEbook, setIsEbook] = useState<boolean>(false)
  const [isBrandName, setIsBrandName] = useState<boolean>(false)

  // fetch single corp details and set data in form
  useEffect(() => {
    const randomString = Math.random().toString(36).substring(2, 8)
    try {
      setLoading(true)
      if (objId && modalState) {
        axios.get(`http://localhost:5000/api/corp-srv/edit-corp/${objId}`).then(res => {
          const { result } = res.data as responseType
          if (action === DUPLICATE_VAR || action === EDIT_VAR) {
            form.setFieldsValue({
              ...result,
              corp_name: action === DUPLICATE_VAR ? `${result.corp_name}-${randomString}` : result.corp_name,
            })
          }
        })
      }
    } finally {
      setLoading(false)
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

  // fetch a fresh request after a new creation or edit
  const revalidateList = (): Promise<void> => mutate('http://localhost:5000/api/corp-srv/corp-list')

  // form submit handler
  const submitFormHandler = async (values: formValueTypes): Promise<void> => {
    setBtnLoading(true)
    const payload = {
      ...values,
      product_image: productImage,
    }
    try {
      if (action === EDIT_VAR) {
        const res = await axios.patch(`http://localhost:5000/api/corp-srv/update-corp/${objId}`, payload)
        ToastMessage('success', '', res.data.message)
        revalidateList()
      } else {
        const res = await axios.post('http://localhost:5000/api/corp-srv/create-corp', payload)
        ToastMessage('success', '', res.data.message)
        revalidateList()
      }
    } catch (err) {
      ToastMessage('error', '', err.message)
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
      width={480}
      open={modalState}
      footer={[
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          disabled={btnLoading || loading}
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
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} rowHeight={140} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} rowHeight={140} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} rowHeight={140} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} rowHeight={140} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} rowHeight={140} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} rowHeight={140} />
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={submitFormHandler}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Corp Name"
                name="corp_name"
                rules={[
                  {
                    required: true,
                    message: 'Corp name is required',
                  },
                  {
                    whitespace: true,
                    message: 'Enter a valid name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CS Hours" name="cs_hours">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Support Number"
                name="corp_mobile"
                rules={[
                  {
                    required: true,
                    message: 'Support mobile is required',
                  },
                  {
                    whitespace: true,
                    message: 'Enter a valid number',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Support Email"
                name="corp_email"
                rules={[
                  {
                    required: true,
                    message: 'Support email is required',
                  },
                  {
                    type: 'email',
                    message: 'Enter a valid email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Corp Address"
                name="corp_address"
                rules={[
                  {
                    required: true,
                    message: 'Corp address is required',
                  },
                  {
                    whitespace: true,
                    message: 'Enter a valid address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="d-flex">
                <Form.Item className="mb-2" name="ebook" valuePropName="checked">
                  <Checkbox onChange={e => setIsEbook(e.target.checked)}>Ebook</Checkbox>
                </Form.Item>
                <Form.Item className="mb-2" name="is_brand_name" valuePropName="checked">
                  <Checkbox onChange={e => setIsBrandName(e.target.checked)}>Brand Name</Checkbox>
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              {isEbook && (
                <Form.Item
                  name="ebook_url"
                  rules={[
                    {
                      required: isEbook,
                      message: 'URL is required',
                    },
                  ]}
                >
                  <Input placeholder="Enter ebook URL" />
                </Form.Item>
              )}
            </Col>
            <Col span={24}>
              {isBrandName ? (
                <Form.Item
                  label="Brand Name"
                  name="product_name"
                  rules={[
                    {
                      required: isBrandName,
                      message: 'Brand name is required',
                    },
                    {
                      whitespace: true,
                      message: 'Enter a valid brand name',
                    },
                  ]}
                >
                  <Input placeholder="Enter brand name" />
                </Form.Item>
              ) : (
                <Form.Item
                  label="Brand Logo"
                  name="product_image"
                  valuePropName="file"
                  rules={[
                    {
                      required: true,
                      message: 'Brand logo is required',
                    },
                  ]}
                >
                  <Upload {...uploadProps} className="d-block" maxCount={1}>
                    <Button className="w-100" icon={<UploadOutlined />}>
                      Upload png only
                    </Button>
                  </Upload>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  )
}

export default CreateCorp
