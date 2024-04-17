import Bar from './assets/svgs/bar.svg'
import './assets/style.css'
import Navbar from './components/Navbar'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
// const req = "http://localhost:3001"
const req = "https://nebula-lounge-api.vercel.app"


export default function MenusPageAdmin(){
  const reqLinkAdmin = req+"/admin/"
  const reqLinkMenus = req+"/admin/menus"
  const reqLinkPromo = req+"/admin/menus/promo"
  const reqLinkStatus = req+"/admin/menus/status"
  const reqLinkUpdate = req+"/admin/menus/update"
  const [cookie, setCookie] = useCookies(['loggedAdmin'])
  const [menus, setMenu] = useState([])
  const navigate = useNavigate()
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [variant, setVariant] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() =>{
    const token = cookie.loggedAdmin
    const fetchData = async () =>{
      const result = await axios.post(reqLinkAdmin, {
        token : token
      })
      if(!result.data.access){
        navigate("/admin/login")
      }else{
        fetchMenus()
      }
    }
    if(token){
      fetchData()
    }else{
      navigate("/admin/login")
    } 
  }, [])

  const fetchMenus = async () =>{
    const datas = await axios.get(reqLinkMenus)
    setMenu(datas.data.data)
  }
  const setPromo = async (id, prevSpecialType) =>{
    const menuID = id
    const specialType = prevSpecialType
    const results = await axios.post(reqLinkPromo, {
      id: menuID,
      specialType : specialType === 1 ? 0 : 1
    })
    setMenu(results.data.data)
  }
  const setStatus = async (id, prevStatus) =>{
    const menuID = id
    const status = prevStatus
    const results = await axios.post(reqLinkStatus, {
      id: menuID,
      status : status === 1 ? 0 : 1
    })
    setMenu(results.data.data)
  }
  
  const editMenu = async (id, name, variant, price) =>{
    if(id, name, variant ,price){
      setId(id)
      setName(name)
      setVariant(variant)
      setPrice(price)
      document.querySelector(".boxEditMenu").style.transform = "translateY(0%)"
    }
  }
  const cancelEdit = () =>{
    document.querySelector(".boxEditMenu").style.transform = "translateY(100%)"
    setId("")
    setName("")
    setVariant("")
    setPrice("")
  }
  const saveEdit = async () =>{
    if(id !== "" && name !== "" && variant !== "" && price !== ""){
      const update = await axios.post(reqLinkUpdate, {
        id: id,
        name : name, 
        variant : variant,
        price : price
      })
      if(update.data.confirm){
        setMenu(update.data.data)
        document.querySelector(".boxEditMenu").style.transform = "translateY(100%)"
      }else{
        console.log("btl")
        document.querySelector(".boxEditMenu").style.transform = "translateY(100%)"
      }
    }
  }

  return(
    <section className='menusPage'>
      <div className="container">
        <Navbar checked ={1}/>
        <div className='titleAdmin'>
          <div className='cover'>
            <p className='bold'>Nebula's Menu List</p>
            <div className='line'></div>
          </div>
        </div>
        <div className='boxMenuAdmin'>
          <div className='headers'>
            <p className='reguler id'>ID</p>
            <p className='reguler'>Name</p>
            <p className='reguler'>Variant</p>
            <p className='reguler'>Price</p>
            <div className='boxActions'>Actions</div>
          </div>
          {menus.map((menu) => (
            <div className='itemMenuAdmin' key={menu.id}>
              <p className='reguler id'>{menu.id}</p>
              <p className='reguler'>{menu.name}</p>
              <p className='reguler'>{menu.variant}</p>
              <p className='reguler'>IDR {menu.price}K</p>
              <div className='boxActions'>
                <button className='edit' type='button' onClick={() =>{editMenu(menu.id, menu.name, menu.variant, menu.price)}}>Edit Menus</button>
                {menu.specialType === 0 ?
                <button className='promo' type='button' onClick={() => setPromo(menu.id, menu.specialType)}>Set Promo</button>
                :
                <button className='promo alpha' type='button' onClick={() => setPromo(menu.id, menu.specialType)}>Unset Promo</button>
                }
                {menu.status === 1 ? 
                <button className='unactive' type='button' onClick={() => setStatus(menu.id, menu.status)}>Unactive Menu</button>
                :
                <button className='unactive alpha' type='button' onClick={() => setStatus(menu.id, menu.status)}>Activate Menu</button>
                }
              </div>
            </div>
          ))}
        </div>
        <div className='boxEditMenu'>
          <div className='contentAreaEdit'>
            <p className='bold titleEdit'>Edit Menu</p>
            <div className='coverBoxEdit'>
              <div className='pasifArea'>
                <label htmlFor="id" className='reguler'>Menu's ID</label>
                <label htmlFor="name" className='reguler'>Menu's Name</label>
                <label htmlFor="variant" className='reguler'>Menu's Variant</label>
                <label htmlFor="price" className='reguler'>Menu's Price</label>
              </div>
              <div className='colon'>
                <p className='reguler'>:</p>
                <p className='reguler'>:</p>
                <p className='reguler'>:</p>
                <p className='reguler'>:</p>
              </div>
              <div className='inputArea'>
                <input type='text' value={id} className='id' id='id' name='id' disabled></input>
                <input type='text' value={name} onChange={(e) => {setName(e.target.value)}} className='name' id='name' name='name'></input>
                <input type='text' value={variant} onChange={(e) => {setVariant(e.target.value)}} className='variant' id='variant' name='variant'></input>
                <input type='number' value={price} onChange={(e) => {setPrice(e.target.value)}} className='price' id='price' name='price'></input>
              </div>
            </div>
            <div className='buttonArea'>
              <button type='button' onClick={cancelEdit} className='cancelBtn'>Cancle Change</button>
              <button type='button' onClick={saveEdit} className='saveBtn'>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}