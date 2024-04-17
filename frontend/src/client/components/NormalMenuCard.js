import { useState, useEffect } from "react"
import plus from '../assets/svgs/plusCounter.svg'
import minus from '../assets/svgs/minusCounter.svg'

export default function NormalMenuCard(props){
  const [firstAdd, setFirstAdd] = useState(false)
  let [count, setCount] = useState(0)

  const addCartFirst = (id) =>{
    setFirstAdd(true)
    addToCart(id)
  }
  const addToCart = (id)=>{
    setCount(count+=1)
    props.handleOrder(id, 1)
  }
  const removeFromCart = (id) =>{
    if(count === 1){
      setFirstAdd(false)
    }
    setCount(count-=1)
    props.handleOrder(id, 0)
  }

  useEffect(() =>{
    if(props.default){
      setCount(0)
      setFirstAdd(false)
    }
  }, [props.default])
  return(
    <div className="cardNormalMenu">
      <div className="detailNormalMenu">
        <p className="bold menuName">{props.name}</p>
        <p className="reguler menuType">Variant : {props.variant}</p>
        <p className="reguler menuPrice">IDR {props.price}K</p>
      </div>
      <div className="sideNormalMenu">
        <div className="imgNormalMenu">
          <img src={""} alt="" />
        </div>
        <div className="buttonNormalMenu">
          {firstAdd ? 
          <div className="counterMenu">
            <button className="counterMin" onClick={() => {removeFromCart(props.id)}}>
              <img src={minus} alt="min"/>
            </button>
            <p className="countValue reguler">{count}</p>
            <button className="counterAdd" onClick={() => {addToCart(props.menu)}}>
              <img src={plus} alt="plus"/>
            </button>
          </div>
          : 
          <button className="addButton" onClick={() =>{addCartFirst(props.menu)}}>Add</button> 
          }
        </div>
      </div>
    </div>
  )
}