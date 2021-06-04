import { createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  return (
    <AuthContext.Provider value='hello there'>
      {props.children}
    </AuthContext.Provider>
  )
}
