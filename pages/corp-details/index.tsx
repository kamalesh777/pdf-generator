import React from 'react'
import MetaComponent from '@/common/MetaComponent'
import LayoutWrapper from '@/layout/Index'
import Corp from '@/view/Corp'

const CorpDetails = (): JSX.Element => (
  <LayoutWrapper>
    <MetaComponent title="Corp Details" />
    <Corp />
  </LayoutWrapper>
)

export default CorpDetails
