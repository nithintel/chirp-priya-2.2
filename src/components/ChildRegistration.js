import { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import RegistrationForm from './RegistrationForm'
import { ChirpContext } from '../Context/ChirpContext'

export const ChildRegistration = () => {
  const { addEditModal, setAddEditModal, setLoadedData } = useContext(ChirpContext)
  return (
    <>
      <Button
        variant='primary'
        onClick={() => {
          setLoadedData(null)
          setAddEditModal(true)
        }}
        style={{ margin: '5px' }}
      >
        Add child details
      </Button>
      <Modal
        show={addEditModal}
        onHide={() => {
          setAddEditModal(false)
        }}
        backdrop='static'
        keyboard={false}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title>Add Child Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm close={() => setAddEditModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  )
}
