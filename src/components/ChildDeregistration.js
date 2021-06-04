import { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'

import DeregistrationForm from './DeregistrationForm'
import { ChirpContext } from '../Context/ChirpContext'

export const ChildDeregistration = () => {
  const { deregisterModal, setDeregisterModal } = useContext(ChirpContext)
  return (
    <>
      <Modal
        show={deregisterModal}
        onHide={() => setDeregisterModal(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-modal-sizes-title-lg'
        size='lg'
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id='example-modal-sizes-title-lg'>
            Remove Participation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeregistrationForm close={() => setDeregisterModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  )
}
