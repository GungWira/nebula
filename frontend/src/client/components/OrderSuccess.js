import {useParams} from "react-router-dom"
import GlassSVG from '../assets/svgs/white_glass.svg'
import BlackBar from '../assets/svgs/black_bar.svg'



export default function OrderSuccess(){
  const tableId =  useParams()

  const backToMenuPage = () =>{
    document.querySelector(".order_success").style.transform = "translateY(100%)"
  }

  return(
    <section className="order_success">
      <div className="container">
        <img src={BlackBar} alt=""/>
        <p className="bold">Order Success</p>
        <p className="reguler">Please kindly await your order as we prepare it</p>
      </div> 
        <button type="button" className="main-button order_button" onClick={()=>{backToMenuPage()}}>
          <div className="text-side">
            <p className="medium">Back to Order Page</p>
            <p className="reguler">Order for table {tableId.tableId}</p>
          </div>
          <div className="order-side">
            <img src={GlassSVG} alt=""/>
          </div>
        </button>
    </section>
  )
}