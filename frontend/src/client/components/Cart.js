import {useParams} from "react-router-dom"
import GlassSVG from '../assets/svgs/white_glass.svg'
import { useEffect } from "react"
import axios from "axios"
const reqLink = "http://localhost:3001/client/order"

export default function Cart(props){
  useEffect(()=>{
    if(props.trigger){
      document.querySelector(".cartPage").style.transform = "translateY(0%)"
    }else{
      document.querySelector(".cartPage").style.transform = "translateY(130%)"
    }
  }, [props.trigger])

  const calculateTotal = () => {
    return props.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const total = calculateTotal();
  const closeCart = ()=>{
    props.cartClose()
  }

  const confirmOrder = async () =>{
    const formatedOrder = props.cartItems.map(item => `${item.name} (${item.quantity})`)
    const finalFormat = formatedOrder.join("|")
    const results = await axios.post(reqLink, {
      name : props.name,
      table : urlTableId.tableId,
      total : total,
      orders : finalFormat
    })
    if(results.status === 200){
      props.resetCart()
    }else{
      
    }
  }
  const urlTableId = useParams()
  return(
    <section className="cartPage">
      <div className="transCover"></div>
      <div className="coverCartPage">
        <button className="closeCartBtn" onClick={closeCart}></button>
        <div className="container">
          <div className="titleCart">
            <p className="bold">Detail Order</p>
            <div className="line"></div>
          </div>
          <div className="detailCustomer">
            <div className="itemDetailCustomer">
              <p className="reguler">Customer</p>
              <p className="bold">{props.name}</p>
            </div>
            <div className="itemDetailCustomer">
              <p className="reguler">Table Number</p>
              <p className="bold">{urlTableId.tableId}</p>
            </div>
            <div className="itemDetailCustomer">
              <p className="reguler">Orders Count</p>
              <p className="bold">{props.count}</p>
            </div>
            <div className="itemDetailCustomer">
              <p className="reguler">Menu Ordered</p>
            </div>
            <div className="detailMenuOrdered">
              {props.cartItems.map((cartItem) => (
                <div className="item" key={cartItem.id}>
                  <p className="reguler">{cartItem.name} ({cartItem.quantity})</p>
                  <p className="bold">{cartItem.price * cartItem.quantity}K</p>
                </div>
              ))}
            </div>
            <div className="itemDetailCustomer total">
              <p className="reguler">Total</p>
              <p className="bold">{total}K</p>
            </div>
            <button type="button" className="main-button orderButton" onClick={()=>{confirmOrder()}}>
              <div className="text-side">
                <p className="medium">Confirm the order</p>
              </div>
              <div className="order-side">
                <img src={GlassSVG} alt=""/>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}