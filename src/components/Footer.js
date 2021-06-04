import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import { ChirpContext } from '../Context/ChirpContext'

export const Footer = () => {
 const { tabKeys } = useContext(ChirpContext)
  return (
   <Navbar expand='sm' variant='light' style={{backgroundColor: '#e4007c'}} fixed={tabKeys === 'deregister' ? 'bottom': ''}>
    <Container  style={{width:"100%"}}>
     
   <Navbar.Brand
     href='#home'
     style={{
      paddingLeft: '10px',
      fontSize: 'small',
      fontWeight: 'bold',
       color: '#fff',
       // backgroundColor: '#cb4d97',
      }}
   >
     <img
       alt=''
       src='/images/sub_logo.jpg'
       width='30'
       height='30'
       className='d-inline-block align-top'
     />{' '}
    <span style={{margin:'5px', fontSize:'17px'}}>
     {`Copyright @${new Date().getFullYear()} PRA Health Sciences. All rights reserved.`}
     </span> 
   </Navbar.Brand>
       </Container>
   </Navbar>
  )
}
