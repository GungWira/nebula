import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import './assets/style.css'
import ItemOrderList from './components/ItemOrderList'
import Navbar from './components/Navbar'
import axios from 'axios'
const reqLink = "http://localhost:3001/admin/orders"
const reqLinkAdmin = "http://localhost:3001/admin/"


export default function OrdersPageAdmin(){
  const [orders, setOrder] = useState([])
  const [cookie, setCookie] = useCookies(['loggedAdmin'])
  const navigate = useNavigate()

  const fetchData = async function () {
    const result = await axios.get(reqLink)
    setOrder(result.data.data)
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

  return(
    <section className='orderPage'>
      <div className='container containerPage'>
        <Navbar checked={2}/>
        <div className='titleAdmin'>
          <div className='cover'>
            <p className='bold'>The Order List</p>
            <div className='line'></div>
          </div>
          <button className='refresh-btn' onClick={() =>{fetchData()}}>Refresh Order</button>
        </div>
        <div className='boxOrderList'>
          {orders.map((order) =>(
            <ItemOrderList key={order.id} data={order} fetchData={fetchData}/>
          ))}
        </div>
      </div>
    </section>
  )
}