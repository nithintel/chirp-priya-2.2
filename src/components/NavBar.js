import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import { ChirpContext } from '../Context/ChirpContext'

export const NavBar = () => {
  const { employeeDetails } = useContext(ChirpContext)
  return (
    <Navbar expand='sm' variant='dark' bg='light'>
      <Navbar.Brand
        href='#home'
        style={{
          paddingLeft: '10px',
          fontSize: 'larger',
          fontWeight: 'bold',
          color: '#3178c6',
        }}
      >
        <img
          alt=''
          src='/images/main_logo.png'
          width='30'
          height='30'
          className='d-inline-block align-top'
        />{' '}
        Children's Internal Review Panel (ChiRP)
      </Navbar.Brand>
      <Container>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text
            href='#'
            style={{ fontSize: 'larger', fontWeight: 'bold', color: '#000' }}
          >
            {employeeDetails
              ? `Hello, ${employeeDetails?.fullName}`
              : 'User not logged in'}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
