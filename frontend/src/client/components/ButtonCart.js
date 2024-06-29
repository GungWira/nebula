import { useEffect } from 'react'
import {useParams} from "react-router-dom"


export default function ButtonCart(props){
  useEffect(() =>{
    const setButton = () =>{
      if(props.items !== 0){
        document.querySelector("button.cartButton").style.transform = "translateY(0%)"
        document.querySelector("button.cartButton").style.opacity = "1"
      }else{
        document.querySelector("button.cartButton").style.transform = "translateY(200%)"
        document.querySelector("button.cartButton").style.opacity = "0"
      }
    }
    setButton()
  }, [props.items])
  const urlTableId = useParams()

  return(
    <button type="button" className="main-button cartButton" onClick={()=>{props.onClick()}}>
      <div className="text-side">
        <p className="medium">{props.items} Items</p>
        <p className="reguler">Order for table {urlTableId.tableId}</p>
      </div>
      <div className="order-side">
        <img src="/svgs/white_glass.svg" alt=""/>
      </div>
    </button>
  )
}