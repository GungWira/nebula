import Bar from './assets/svgs/bar.svg'
import './assets/style.css'
import Navbar from './components/Navbar'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import axios from 'axios';
const reqLinkAdmin = "http://localhost:3001/admin/"



export default function AdminPage(){
  const [cookie, setCookie] = useCookies(['loggedAdmin'])
  const navigate = useNavigate()

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
  return(
    <section className='adminPage'>
      <div className="container">
        <Navbar checked ={-1}/>
        <div className='content'>
          <img src={Bar} alt='bar_icon'/>
          <p className='bold'>Welcome Admin!</p>
          <p className='reguler'>Let’s set the music and enjoy the working hard together!</p>
        </div>
      </div>
    </section>
  )
}