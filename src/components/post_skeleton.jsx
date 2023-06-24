import React from 'react'
import { Container, Placeholder } from 'react-bootstrap'

export default function PostSkeleton() {
  return (
    <Container className="container-md py-4" style={{ maxWidth: 800 }}>
        <div className='d-flex flex-column gap-2'>
            <Placeholder className="border-bottom py-2 my-2" as='h5' animation='wave'>
                <Placeholder className="rounded-1" xs={10} size='lg' />
            </Placeholder>
            <Placeholder className="d-flex flex-column gap-2 mb-4" as="p" animation='wave'>
                <Placeholder xs={8} className="rounded-1" size='md' />
                <Placeholder xs={7} className="rounded-1" size='sm' />
                <Placeholder xs={7} className="rounded-1" size='sm' />
            </Placeholder>
            <Placeholder className="d-flex flex-column gap-2 mb-4" as="p" animation='wave'>
                <Placeholder xs={8} className="rounded-1" size='md' />
                <Placeholder xs={7} className="rounded-1" size='sm' />
                <Placeholder xs={7} className="rounded-1" size='sm' />
            </Placeholder>
            <Placeholder className="d-flex flex-column gap-2 mb-4" as="p" animation='wave'>
                <Placeholder xs={8} className="rounded-1" size='md' />
                <Placeholder xs={7} className="rounded-1" size='sm' />
                <Placeholder xs={7} className="rounded-1" size='sm' />
            </Placeholder>
        </div>
    </Container>
  )
}
