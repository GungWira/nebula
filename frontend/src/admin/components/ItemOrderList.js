import axios from "axios"
import { useEffect, useState } from "react"
const reqLink = "http://localhost:3001/admin/orders"

export default function ItemOrderList(props){
  let [isPay, setIsPay] = useState(false)
  const [listOrder, setListOrder] = useState([])

  const removeOrder = (value)=>{
    async function postData(){
      const post = await axios.post(reqLink, {
        id : props.data.id,
        status : value
      })
    }
    postData()
    props.fetchData()
  }
  useEffect(() =>{
    setListOrder(props.data.orders.split("|"))
  }, [])
  return(
    <div className='itemOrderList'>
      <div className='pasifOrderList'>
        <div className='customerDetail'>
          <p className='bold'>Table {props.data.table}</p>
          <p className='reguler'>{props.data.name}</p>
          <p className='reguler'>{props.data.total}K</p>
        </div>
        <div className='orderDetail'>
          {listOrder.map((item, index) =>(
            <p className='reguler' key={index}>{item}</p>
          ))}
        </div>
      </div>
      <div className='activeOrderList'>
        {isPay ? 
          <button className='complete' onClick={() =>{removeOrder(2)}}>Complete</button>
        :
        <div className="coverDoubleButton">
          <button className='pay' onClick={()=>{setIsPay(true)}}>Pay</button>
          <button className='cancle' onClick={() =>{removeOrder(0)}}>Cancle</button>
        </div>
        }
      </div>
    </div>
  )
}