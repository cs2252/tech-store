import axios from 'axios'
import url from '../utils/URL'

async function registerUser({email,password,userName}){
  const response=await axios.post(`${url}/auth/local/register`,
  {
    username:userName,
    email:email,
    password:password
  })
  .catch(error=>console.log(error))
  console.log(response)
  return response
  

}
export default registerUser
