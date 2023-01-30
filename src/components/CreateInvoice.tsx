import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import axios from 'axios'
import { startCase } from 'lodash'
import React, { useEffect, useState } from 'react'
import { mutate } from 'swr'
import { TableContentLoaderWithProps } from '@/common/SkeletonLoader'
import ToastMessage from '@/common/ToastMessage'
import { DUPLICATE_VAR, EDIT_VAR } from '@/constant/ApiConstant'
import { randomString } from '@/utils/commonFunc'

interface propTypes {
  modalState: boolean
  setModalState: (params: boolean) => void
  action: string
  objId: string
}

interface formValueTypes {
  order_name: string
  order_id: string
  order_email: string
  order_mobile: string
  tracking_id: string
  order_address: string
  product_price: string
  shipping_price: string
  total_price: string
  order_card: string
  order_date: string
  corp_id: string
  corp_details: string
}
interface responseType {
  result: Record<string, unknown>
  message: string
}
interface corpListType {
  value: string
  label: string
}

const CreateInvoice = ({ modalState, setModalState, action, objId }: propTypes): JSX.Element => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [corpList, setCorpList] = useState<corpListType[]>([])

  // fetch all corp list
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/corp-srv/corp-list?extended=true')
      .then(res => {
        setCorpList(res.data.result.map(obj => ({ label: obj.name, value: obj.id })))
      })
      .catch(err => ToastMessage('error', '', err.message))
  }, [])

  useEffect(() => {
    setLoading(true)
    if (objId && modalState) {
      axios.get(`http://localhost:5000/api/invoice-srv/edit-invoice/${objId}`).then(res => {
        const { result } = res.data as responseType
        if (action === DUPLICATE_VAR || action === EDIT_VAR) {
          form.setFieldsValue({
            ...result,
            order_name: action === DUPLICATE_VAR ? `${result.order_name} - ${randomString}` : result.order_name,
          })
        }
        setLoading(false)
      })
    }
  }, [modalState, action, form, objId])

  // hide modal
  const destroyModal = (): void => {
    setModalState(false)
    form.resetFields()
  }

  // fetch a fresh request after a new creation or edit
  const revalidateList = (): Promise<void> => mutate('http://localhost:5000/api/invoice-srv/invoice-list')

  // form submit handler
  const submitFormHandler = async (formValues: formValueTypes): Promise<void> => {
    setBtnLoading(true)
    try {
      if (action === EDIT_VAR) {
        await axios.patch(`http://localhost:5000/api/invoice-srv/update-invoice/${objId}`, formValues)
        revalidateList()
      } else {
        await axios.post('http://localhost:5000/api/invoice-srv/create-invoice', formValues)
        revalidateList()
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      setBtnLoading(false)
      destroyModal()
    }
  }

  console.log(corpList)
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
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[50, 50]} />
          <TableContentLoaderWithProps rowCounts={1} columnWidth={[100]} />
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={submitFormHandler}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="User Name" name="order_name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Product Name" name="order_product_name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="order_email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone" name="order_mobile">
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
              <Form.Item label="Address" name="order_address">
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
                <Select options={corpList} allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  )
}

export default CreateInvoice
