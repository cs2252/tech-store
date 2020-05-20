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

  // axios
  // .post('http://localhost:1337/auth/local/register', {
  //    userName,
  //  email,
  //   password,
  // })
  // .then(response => {
  //   // Handle success.
  //   console.log('Well done!');
  //   console.log('User profile', response.data.user);
  //   console.log('User token', response.data.jwt);
  // })
  // .catch(error => {
  //   // Handle error.
  //   console.log('An error occurred:', error);
  // });
}
export default registerUser
