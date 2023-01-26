import { Button } from 'antd'
import React, { useState } from 'react'
import CreateCorp from '@/components/CreateCorp'

const Corp = (): JSX.Element => {
  const [modalState, setModalState] = useState<boolean>(false)
  return (
    <>
      <h3>
        Create a new Corp
        <Button onClick={() => setModalState(true)} type="primary">
          Create
        </Button>
      </h3>
      <CreateCorp {...{ modalState, setModalState }} />
    </>
  )
}

export default Corp
