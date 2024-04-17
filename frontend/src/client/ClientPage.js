import LoadingPage from './components/LoadingPage'
import LoginPage from './components/LoginPage'
import MenuPage from './components/MenuPage'
import { useCookies } from 'react-cookie'
import './assets/style.css'
import { useState, useEffect } from 'react'
import ButtonCart from './components/ButtonCart'
import Cart from './components/Cart'
import OrderSuccess from './components/OrderSuccess'
import axios from 'axios'
const reqLink = "http://localhost:3001/client/menu/type"
const reqLinkSpecial = "http://localhost:3001/client/menu/special"
const reqLinkNormalMenu = "http://localhost:3001/client/menu/detail"

export default function ClientPage(){
  const [cookies, setCookies] = useCookies(['name'])
  const [loggedIn, setLoggedIn] = useState(false)
  let [items, setItem] = useState(0)
  const [cart, setCart] = useState([])
  const [cartTrigger, setCartTrigger] = useState(false)
  const [cardMenuDefault, setcardMenuDefault] = useState(false)
  const [allMenus, setAllMenus] = useState([])
  const [menusHeaders, setMenusHeaders] = useState([])
  const [specialMenus, setSpecialMenus] = useState([])

  const handleLogin =(name)=> {
    setLoggedIn(true)
    setCookies('name', name, { maxAge : 60 * 60 * 2})
  }

  const handleOrder = (menu, count)=> {
    if(count === 1){
      addToCart(menu)
      setItem(items+=1)
    }else{
      removeFromCart(menu)
      setItem(items-=1)
    }
    setcardMenuDefault(false)
  }

  const addToCart = (menu)=>{
    const existingItem = cart.find(item => item.id === menu.id)
    if(existingItem){
      setCart(cart.map(item => item.id === menu.id ? {...item, quantity : item.quantity + 1} : item))
    }else{
      setCart([...cart, {...menu, quantity: 1}])
    }
  }
  const removeFromCart = (id) =>{
    const updatedCart = cart.map((item) => item.id === id ? {...item, quantity : item.quantity - 1} : item)
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCart(filteredCart)
  }

  const cartOpen = ()=>{
    setCartTrigger(true)
  }
  const cartClose = ()=>{
    setCartTrigger(false)
  }

  const resetCart = () =>{
    setCart([])
    setItem(0)
    setCartTrigger(false)
    setcardMenuDefault(true)
    document.querySelector(".order_success").style.transform = "translateY(0%)"
  }

  // MENUS
  useEffect(() =>{
    async function fetchData() {
      const allMenus = await axios.get(reqLinkNormalMenu)
      setAllMenus(allMenus.data.data)
      const menuHeaders = await axios.get(reqLink)
      setMenusHeaders(menuHeaders.data.data)
      const specialMenus = await axios.get(reqLinkSpecial)
      setSpecialMenus(specialMenus.data.data)
      loginAnimation()
    }
    function loginAnimation(){
      const loggedInName = cookies['name']
      let scrollPage = ".login_screen"
      // kalau user sudah login
      if(loggedInName !== undefined){
        setLoggedIn(true)
        scrollPage = ".menuPage"
      }
      setTimeout(() => {
        document.querySelector(".loading_screen").style.transform = "translateY(-100%)"
        document.querySelector(scrollPage).style.transform = "translateY(0vh)"
      }, 4000);
    }
    fetchData()
  }, [])

  return(
    <main>
      <LoadingPage/>
      <LoginPage onLogin={handleLogin}/>
      <MenuPage name={cookies.name} handleOrder={handleOrder} default={cardMenuDefault} allMenus={allMenus} headers={menusHeaders} specialMenus={specialMenus}/>
      <ButtonCart items={items} onClick={cartOpen}/>
      <Cart trigger={cartTrigger} name={cookies.name} count={items} cartClose={cartClose} cartItems={cart} resetCart={resetCart}/>
      <OrderSuccess/>
    </main>
  )
}