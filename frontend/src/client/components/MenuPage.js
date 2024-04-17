import TextTheme from './TextTheme'
import OfferImg from '../assets/imgs/special_offer.png'
import {useParams} from "react-router-dom"
import NormalMenu from './NormalMenu'
import { useEffect, useState } from 'react'
import SpecialMenuBox from './SpecialMenuBox'

export default function MenuPage(props){
  const urlTableId = useParams()
  const [results, setResults] = useState([])
  const [specialMenu, setSpecialMenu] = useState([])
  const [specialSection, setSpecialSection] = useState(0)
  const [normalMenu, setnormalMenu] = useState([])

  useEffect(() =>{
    setResults(props.headers)
    setnormalMenu(props.allMenus)
    props.specialMenus.length === 0 ? setSpecialSection(0) : setSpecialSection(1)
    setSpecialMenu(props.specialMenus)
  }, [props.headers, props.allMenus , props.specialMenus])
  

  return(
    <section className='menuPage'>
      <div className='container'>
        <div className='header'>
          <TextTheme title={props.name} subtitle={"Let’s Party Tonight!"}/>
          <p className="table-id bold">Table {urlTableId.tableId}</p>
        </div>
        <div className='offer'>
          <img src={OfferImg} alt="nebula_offer"/>
        </div>
        {/* Special Offer */}
        {specialSection === 1 ? <SpecialMenuBox data={specialMenu}/> : <div></div>}
        {/* Special Offer */} 
        {/* Normal Menu */}
        {results.map((result) =>(
          <NormalMenu title={result.type} typeID={result.id} key={result.id} handleOrder={props.handleOrder} default={props.default} allMenus = {normalMenu}/>
        ))}
        {/* Normal Menu */}
      </div>
    </section>
  )
}