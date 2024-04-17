import { decodeToken } from "../utils/jwt"

function auth(req, res, next){
  if(req.cookies.token){
    const token = req.cookies.token
    req.loggedUser = decodeToken(token)
    next()
  }else{
    res.json({message: "Fail on Auth", access:false})
  }
}