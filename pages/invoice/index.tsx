import React from 'react'
import MetaComponent from '@/common/MetaComponent'
import LayoutWrapper from '@/layout/Index'
import Invoice from '@/view/Invoice'

const index = (): JSX.Element => (
  <LayoutWrapper>
    <MetaComponent title="Invoice Details" />
    <Invoice />
  </LayoutWrapper>
)

export default index
