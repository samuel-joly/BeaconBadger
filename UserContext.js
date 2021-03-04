import {createContext} from 'react'

export const UserInit = {
  email : "",
  matricule : "",
  token : "",
  isLogged: false,
  name: "",

}
const UserContext = createContext(UserInit);
export default UserContext
