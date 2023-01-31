import { Card, Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import useFetch from '@/hooks/useFetch'
import Lines from './Lines'

const InvoiceBill = (): JSX.Element => {
  const router = useRouter()

  const { data, isLoading } = useFetch(`http://localhost:5000/api/invoice-srv/view-invoice?id=${router.query.id}`)

  console.log(data)

  return (
    <Card>
      <div className="invoice">
        <header>
          <Row gutter={12}>
            <Col span={12}>
              <div className="productDetails">
                <h3 className="corpName">Hello world</h3>
                <p className="corpAddress">8825 ELarkspur DR,Scottsdale,AZ85260,USA</p>
                <p className="serviceNumber cmntext">
                  CustomerService:<span>8338329195</span>
                </p>
                <p className="serviceHours cmntext">
                  CSHours:<span>MONDAY-FRIDAY,9AMEST-6PMESTSATURDAY</span>
                </p>
                <p className="orderDate cmntext">
                  OrderDate:<span>11/17/20</span>
                </p>
              </div>
            </Col>
            <Col span={12} className="text-right">
              <figure className="logoImage">
                <img src="images/logo.png" />
              </figure>
              <h3 className="logoText">Brand Name</h3>
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
                <h3 className="clientName">Larysa Druzhynina</h3>
                <p className="clientAddress cmntext">23 Rose downblvd Debary,FL32713US</p>
                <p className="clientEmail cmntext">
                  Email:<span>colley624@hotmail.com</span>
                </p>
                <p className="clientNumber cmntext">
                  Phone:<span>8338329195</span>
                </p>
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
                        Product Item: <span />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Sales Price: <span>$97.88</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Shipping Price: <span>$0.00</span>
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
}

export default InvoiceBill
