import { useContext } from 'react'
import Container from 'react-bootstrap/Container'

import { NavBar } from './components/NavBar'
import { HomeContainer } from './components/HomeContainer'
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal'
import { Toast } from './components/ToastContainer'
import { Footer } from './components/Footer'
import { Loading } from './components/Loading'
import { ChirpContext } from './Context/ChirpContext'
import { AuthContext } from './Context/AuthContext'
import Main from '../src/components/mainComponent/Main'
const App = () => {
  const { isUserLoggedIn } = useContext(ChirpContext)
  const value = useContext(AuthContext)
  console.log(value)
   return isUserLoggedIn ? (
     <>
      
     
        <ConfirmDeleteModal />
        <Toast />
        <NavBar />
        <Container>
          <HomeContainer />
         </Container>
        
        <Footer />
      </>
    ) : (
      <Main></Main>
    )
}

export default App
