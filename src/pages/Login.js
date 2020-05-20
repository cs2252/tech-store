import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import loginUser from '../strapi/loginUser'
import registerUser from '../strapi/registerUser'
import {UserContext} from '../context/user'
function Login() {
  const history=useHistory()
  //setup user context
  const {userLogin}=React.useContext(UserContext)
  //set state value
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("dafault")
  const [isMember, setIsMember] = useState(false)

  let isEmpty=!email || !password || !userName;
  
  const toggleMember=()=>{
    console.log("toggle")
    setIsMember(prevMember=>{
      let isMember=!prevMember
      isMember?setUserName("default"):setUserName("")
      return isMember
    }) 
  } 
  const handleSubmit=async e=>{
    // alert("hello")
    console.log("submit button clicked")
    e.preventDefault()
    let response
    if(isMember)
    {
      response=await loginUser({email,password})
    }
    else
    {
      response=await registerUser({email,password,userName})
    }
    if(response){
     const {jwt:token,user:{username}}=response.data
     const newUser={token,username}
     userLogin(newUser)
     history.push('/products')
    }
    else{
      //show alert
      console.log("failure")
    }
  }

  
  return (
    <section className="section form">
      <h2 className="section-title">{isMember?"sign in"
      :"reagister"}</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          /> 
        </div>   
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          /> 
        </div>   
        {
        !isMember &&
        <div className="form-control">
          <label htmlFor="userName">userName</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={e=>setUserName(e.target.value)}
          /> 
        </div>
        } 
      {/*fill out all empty fields  */}
        {
          isEmpty && 
          <p className="form-empty">
            please fill out all form fields
          </p>
        }
           {/*submit button  */}
        {
        !isEmpty &&
        <button 
          type="submit"
          className="btn btn-primary"
          onClick={(e)=>handleSubmit(e)}
          >
            submit
        </button>
        } 
        {/* register link */}
        <p className="register-link">
          {isMember?"need to register":"already a member"}
          <button type="button" onClick={toggleMember}>click here</button>
        </p>
      </form>
    </section>
  )
}

export default Login
