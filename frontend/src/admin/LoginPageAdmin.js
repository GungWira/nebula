import { useEffect, useState } from 'react'
import './assets/style.css'
import Navbar from './components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
// const req = "http://localhost:3001"
const req = "https://nebula-lounge-api.vercel.app"

export default function LoginPageAdmin() {
  const reqLink = req+"/admin/login"
  const [cookie, setCookie] = useCookies(['loggedAdmin'])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    const login = async () =>{
      const result = await axios.post(reqLink, {
        username: username,
        password : password
      })
      if(result.data.access){
        setCookie('loggedAdmin', result.data.token)
        navigate("/admin")
      }else{
        setUsername("")
        setPassword("")
        navigate("/admin/login")
      }
    }
    login()
  }
  return(
    <section className="loginPage">
      <Navbar checked={-1}/>
      <div className='loginBox'>
        <p className='bold titleLogin'>Login Page</p>
        <p className='reguler subTitle'>Welcome to Nebula’s admin page, please login to continue </p>
        <form className='boxInputLogin'>
          <input type='text' placeholder='Username' value={username} onChange={(e) =>{setUsername(e.target.value)}} className='username' name='username' id='username' required autoComplete='off'/>
          <input type='password' placeholder='Password' value={password} onChange={(e) =>{setPassword(e.target.value)}} className='password' name='password' id='password' required autoComplete='off'/>
          <button type='button' onClick={handleLogin}>
            <p className='bold'>Login to Admin</p>
          </button>
        </form>
      </div>
    </section>
  )
}