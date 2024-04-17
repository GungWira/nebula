import NormalMenuCard from "./NormalMenuCard";
import { useState, useEffect } from "react";


export default function NormalMenu(props){
  const [menus, setMenus] = useState([])
  useEffect(() => {
    async function sortDatas () {
      const typeId = props.typeID
      const menus = await props.allMenus
      const filteredMenus = await menus.filter(menu => menu.typeID === typeId)
      setMenus(filteredMenus)
    }
    sortDatas()
  }, [])
  

  return(
    <section className="normalMenu">
      <div className="titleNormalMenu">
        <p className="bold">{props.title}</p>
        <div className="line"></div>
      </div>
      <div className="boxNormalMenu">
        {menus.map((menu ) =>(
          <NormalMenuCard key={menu.id} name={menu.name} variant={menu.variant} price={menu.price} img={menu.img} id={menu.id} menu={menu} handleOrder={props.handleOrder} default={props.default}/>
        ))}
      </div>
    </section>
  )
}