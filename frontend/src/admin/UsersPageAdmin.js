import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import './assets/style.css'
import Navbar from './components/Navbar'
import axios from 'axios'
const reqLink = "http://localhost:3001/admin/users"
const reqLinkAdmin = "http://localhost:3001/admin/"


export default function UsersPageAdmin(){
  const [users, setUser] = useState([])
  const [cookie, setCookie] = useCookies(['loggedAdmin'])
  const navigate = useNavigate()

  const fetchData = async function () {
    const result = await axios.get(reqLink)
    setUser(result.data.data)
  }
  useEffect(() =>{
    fetchData()
  }, [])

  useEffect(() =>{
    const token = cookie.loggedAdmin
    const fetchData = async () =>{
      const result = await axios.post(reqLinkAdmin, {
        token : token
      })
      if(!result.data.access){
        navigate("/admin/login")
      }
    }
    
    if(token){
      fetchData()
    }else{
      navigate("/admin/login")
    }
  }, [])

  const copyValue = (text) =>{
    navigator.clipboard.writeText(text);
  }

  const deleteUser = () =>{

  }

  return(
    <section className='orderPage adminPage'>
      <div className='container containerPage'>
        <Navbar checked={0}/>
        <div className='titleAdmin'>
          <div className='cover'>
            <p className='bold'>User Database</p>
            <div className='line'></div>
          </div>
        </div>
        <div className='boxUsersList'>
          <div className='header'>
            <p className='medium id'>ID</p>
            <p className='medium'>Name</p>
            <p className='medium'>Phone</p>
            <p className='medium action'>Actions</p>
          </div>
          {users.map((user) =>(
            <div className='userList' key={user.id}>
              <p className='reguler id'>{user.id}</p>
              <p className='reguler'>{user.name}</p>
              <p className='reguler'>{user.phone}</p>
              <div className='action'>
                <button className='copyBtn' onClick={() =>{copyValue(user.phone)}}>Copy</button>
                <button className='deleteBtn' onClick={deleteUser}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}