import React from 'react'
import InvoiceBill from '@/common/InvoiceBill'
import MetaComponent from '@/common/MetaComponent'
import LayoutWrapper from '@/layout/Index'

const index = (): JSX.Element => (
  <>
    <LayoutWrapper>
      <MetaComponent title="Invoice" />
      <InvoiceBill />
    </LayoutWrapper>
  </>
)

export default index
