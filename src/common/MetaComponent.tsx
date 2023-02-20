import Head from 'next/head'
import React from 'react'

interface propTypes {
  title: string
  metaComponent?: React.ReactElement
}

const MetaComponent = ({ title, metaComponent }: propTypes): JSX.Element => (
  <Head>
    <link rel="icon" href="/favicon.png" />
    <title>{`${title} | ${process.env.BRAND_NAME}`}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    {metaComponent}
  </Head>
)

export default MetaComponent
