import { createContext } from "react"

export const AuthContext = createContext(null) 
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authInformation = {}
  return (
    <AuthContext.Provider value={authInformation}></AuthContext.Provider>
  )
}
export default AuthProvider;