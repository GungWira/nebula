const jwt = require("jsonwebtoken")

const secret = "falnv6HFK8214nfdg2394HFA3Nlvn03KNF0ogf2"

function generateToken(payload){
  return jwt.sign(payload, secret, {expiresIn : '2h'})
}

function decodeToken(token){
  return jwt.verify(token, secret)
}

module.exports = {generateToken, decodeToken}