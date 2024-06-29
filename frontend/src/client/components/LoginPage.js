import TextTheme from './TextTheme'
import {useParams} from "react-router-dom"
import { useState, useEffect} from 'react'
import axios from 'axios'

export default function LoginPage(props){
  const reqLink =  props.req+"/client/login/"
  const urlTableId = useParams()
  const [nameValue, setNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [inputComplete, setInputComplete] = useState(0)

  function handleInputNameChange(e){
    setNameValue(e.target.value)
  }
  function handleInputPhoneChange(e){
    setPhoneValue(e.target.value)
  }

  useEffect(() => {
    if(nameValue.trim() !== "" && phoneValue.trim() !== ""){
      setInputComplete(1)
    }else{
      setInputComplete(0)
    }
  }, [nameValue, phoneValue])
  
  useEffect(() =>{
    if(inputComplete === 1){
      document.querySelector(".login_screen .container form button").style.transform = "translateY(0%)"
      document.querySelector(".login_screen .container form button").style.opacity = 1
    }else{
      document.querySelector(".login_screen .container form button").style.transform = "translateY(300%)"
      document.querySelector(".login_screen .container form button").style.opacity = 0
    }
  }, [inputComplete])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      if(nameValue.trim() === "" || phoneValue.trim() === ""){
        console.log("empty")
      }else{
        const login = await axios.post(reqLink, {
          name: nameValue,
          phone: phoneValue
        })
        if(login.data.status === 400){
          document.querySelector(".message").style.transform = "translateY(0%)" 
          setNameValue("")
          setPhoneValue("")
          setTimeout(() => {
             document.querySelector(".message").style.transform = "translateY(300%)" 
          }, 4000);
        }else{
          props.onLogin(nameValue)
          document.querySelector(".login_screen").style.transform = "translateY(-100%)"
          document.querySelector(".menuPage").style.transform = "translateY(0%)" 
          document.querySelector(".message").style.display = "none"
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <section className="login_screen">
      <div className="container">
        <TextTheme title={'Let me know about you'} subtitle={'Welcome to Nebula Lounge!'}/>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your name" autoFocus required value={nameValue} onChange={handleInputNameChange}/>
          <input type="number" inputMode='numeric' placeholder="Your phone number (ex : 081234567890)" required value={phoneValue} onChange={handleInputPhoneChange}/>
          <div className="detail-login">
            <input type="checkbox" name="check" id="check"/>
            <label htmlFor="check">I am over 18 years of age</label>
          </div>
          <button type="submit" className="main-button">
            <div className="text-side">
              <p className="medium">Continue to order page</p>
              <p className="reguler">Order for table {urlTableId.tableId} </p>
            </div>
            <div className="order-side">
              <img src="/svgs/white_glass.svg" alt=""/>
            </div>
          </button>
        </form>
        <div className='message'>
          <p className='bold'>Invalid Format Name</p>
          <p className='reguler'>Your name can only contain letters without any special punctuation</p>
        </div>
      </div>
    </section>
  )
}