// user context
import React,{useState} from 'react'
const UserContext=React.createContext()

function getUserFromLocalStorage(){
  return localStorage.getItem("user")?JSON.parse(localStorage.getItem('user'))
  :{username:null,token:null}
}
function UserProvider({children}){
  const [user, setUser] = useState(getUserFromLocalStorage())

  const userLogin=user=>{
    setUser(user)
    localStorage.setItem('user',JSON.stringify(user))
  }

  const userLogOut=()=>{
    setUser({username:null,token:null})
    localStorage.removeItem("user")
  }
  const [alert, setAlert] = useState({show:true,message:'Hello world',type:"success"})

  const showAlert=(msg,type="success")=>{
    setAlert({show:true,msg,type})
  }
  const hideAlert=()=>{
    setAlert({...alert,show:false})
  }

  return <UserContext.Provider value={
    {user,userLogin,userLogOut
    ,alert,showAlert,hideAlert}}>
    {children}
  </UserContext.Provider>
}
export {UserProvider,UserContext}