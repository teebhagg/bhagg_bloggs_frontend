import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function MySpinner() {
  return (
    <Spinner
    as="span"
    animation="border"
    size="lg"
    role="status"
    aria-hidden="true"
    className='text-primary position-absolute bottom-50 end-50'
    />
  )
}
