import { Card, Col, Row } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Lines from './Lines'
import ToastMessage from './ToastMessage'

interface dataType {
  card_number: string
  corp_address: string
  corp_email: string
  corp_mobile: string
  corp_name: string
  cs_hours: string
  order_address: string
  order_date: string
  order_email: string
  order_id: string
  order_mobile: string
  order_name: string
  order_product_name: string
  product_name: string
  product_price: number
  shipping_price: number
  tracking_id?: string
  product_image?: {
    url: string
    thumbnailUrl: string
    name: string
  }
}
const InvoiceBill = (): JSX.Element => {
  const router = useRouter()

  const [data, setData] = useState<dataType>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPDFData = async (id): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:5000/api/invoice-srv/view-invoice?id=${id}`)
      if (response.data.success) {
        setData(response.data.result)
      } else {
        ToastMessage('error', '', response.data.message)
      }
    } catch (err) {
      ToastMessage('error', '', err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    router.query.id && fetchPDFData(router.query.id)
  }, [router.query.id])

  console.log(loading, data)

  return (
    !loading && (
      <Card>
        <div className="invoice">
          <header>
            <Row gutter={12} justify="space-between">
              <Col span={16}>
                <div className="productDetails">
                  {!!data.corp_name && <h1 className="invoice_title">{data.corp_name}</h1>}
                  {!!data.corp_address && <p className="corpAddress">{data.corp_address}</p>}
                  {!!data.corp_mobile && (
                    <p className="serviceNumber cmntext">
                      Customer Service:<span>{data.corp_mobile}</span>
                    </p>
                  )}
                  {!!data.cs_hours && (
                    <p className="serviceHours cmntext">
                      CS Hours:<span>{data.cs_hours}</span>
                    </p>
                  )}
                  {!!data.order_date && (
                    <p className="orderDate cmntext">
                      Order Date:<span>{data.order_date}</span>
                    </p>
                  )}
                </div>
              </Col>
              <Col span={4} className="text-right">
                {!!data.product_image && (
                  <div className="logoImage">
                    <img src={data.product_image.url} alt={data.product_image.name} /> {/*eslint-disable-line*/}
                  </div>
                )}
                {!!data.product_name && <h1 className="logoText">{data.product_name}</h1>}
              </Col>
              <Col span={24}>
                <Lines linesWidth={[100, 20]} />
              </Col>
            </Row>
          </header>
          <div className="clientDetails">
            <div className="clientHeader">
              <Row gutter={12}>
                <Col span={24}>
                  {!!data.order_name && <h1 className="invoice_title">{data.order_name}</h1>}
                  {!!data.order_address && <p>{data.order_address}</p>}
                  {!!data.order_email && (
                    <p>
                      Email:<span>{data.order_email}</span>
                    </p>
                  )}
                  {!!data.order_mobile && (
                    <p className="clientNumber cmntext">
                      Phone:<span>{data.order_mobile} </span>
                    </p>
                  )}
                  {!!data.tracking_id && (
                    <p className="clientNumber cmntext">
                      Tracking ID:<span>{data.tracking_id} </span>
                    </p>
                  )}
                </Col>
                <Col span={24}>
                  <Lines linesWidth={[100, 20]} />
                </Col>
              </Row>
            </div>
            <div className="clientFooter">
              <Row>
                <Col span={24}>
                  <table className="table orderTable table-bordered">
                    <thead>
                      <th>Order Info</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Product Item: <span>{data.order_product_name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Sales Price: <span>${data.product_price}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Shipping Price: <span>${data.shipping_price}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Total Price: <span>$97.88</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Credit card Last Four: <span>5756</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col span={24}>
                  <Lines linesWidth={[100, 20]} />
                </Col>
              </Row>
            </div>
          </div>
          <footer>
            <div className="row">
              <div className="col-12">
                <div className="footerContent cmntext">
                  Thank you for your purchase from <span className="f-LLC">Crazy Legs202 LLC</span> if you have any questions
                  regarding your order please contact our customer service department directly{' '}
                  <span className="f-number">8338329195</span>
                </div>
              </div>
              <div className="col-12">
                <Lines linesWidth={[100]} />
              </div>
            </div>
          </footer>
        </div>
      </Card>
    )
  )
}

export default InvoiceBill
