import { Link } from 'react-router-dom';
import Logo from '../assets/svgs/logo_vertikal.svg'
import { useEffect } from 'react';

export default function Navbar(props){
  useEffect(()=>{
    const setCheckedNav = ()=>{
        document.querySelectorAll(".nav_link p")[props.checked].style.borderBottom = "1px solid #1818182d"
        document.querySelectorAll(".nav_link p")[props.checked].style.opacity = ".9"
    }
    if(props.checked !== -1){
      setCheckedNav()
    }
  }, [props.checked])
  return(
    <nav>
      <div className='container'>
        <div className="logo">
          <img src={Logo} alt="logo_nebula"/>
        </div>
        <div className="nav_link">
          <p className="reguler">
            <Link to="/admin/users">Users</Link>
          </p>
          <p className="reguler">
            <Link to="/admin/menus">Menus</Link>
          </p>
          <p className="reguler">
            <Link to="/admin/orders">Orders</Link>
          </p>
        </div>
      </div>
    </nav>
  )
}