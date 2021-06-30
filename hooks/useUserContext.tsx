import { useContext } from 'react'
import UserContext, { UserContextType } from '../context/UserContext/UserContext'

export default function useUserContext(): UserContextType {
  return useContext(UserContext)
}
