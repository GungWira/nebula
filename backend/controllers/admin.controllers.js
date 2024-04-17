const { decode } = require("jsonwebtoken")
const db = require("../databases")
const { generateToken } = require("../utils/jwt")

class AdminController{
  static async loginAdmin(req, res){
    const {username, password} = req.body
    try{
      if(username.trim() !== "" && password.trim() !== ""){
        const sql = "SELECT * FROM admin WHERE id = 1"
        db.query(sql, (err, result, field) =>{
          if(err) throw err
          const validUsername = result[0].username
          const validPassword = result[0].password
          if(username === validUsername && password === validPassword){
            res.status(200).json({message: "Data valid", access:true, token:generateToken({username, password})})
          }else{
            res.json({message: "Username & Password salah", access:false})
          }
        })
      }else{
        res.json({message: "Username & Password salah", access:false})
      }
    }catch(error){
      console.log(error)
    }
  }

  static async adminDashboard(req, res){
    const token = req.body.token
    try{
      if(token){
        const decodedToken = decode(token)
        if(decodedToken){
          res.json({message: "Akses diberikan", access: true})
        }else{
          res.json({message: "Akses gagal", access:false})
        }
      }else{
        res.json({message: "Akses gagal", access:false})
      }
    }catch(error){

    }
  }

  static async getActiveOrders(req, res) {
    try {
      const sql = "SELECT * FROM orders WHERE visible = 1"
      db.query(sql, (err, results, fields)=>{
        if (err) throw err
        res.status(200).json({message:"Data berhasil diambil", data:results})
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async postCompleteOrder(req, res){
    const {id , status} = req.body
    try {
      const sql = "UPDATE `orders` SET `status` = '"+status+"', `visible` = '0' WHERE `orders`.`id` = "+id
      db.query(sql, (err, results, fields) =>{
        if(err) throw err
        res.status(200).json({message: "Order selesai"})
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getAllUsers(req, res){
    try {
      const sql = "SELECT * FROM users"
      db.query(sql, (err, results, fields) =>{
        if(err) throw err
        res.status(200).json({message: "Data user berhasil diambil", data:results})
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getMenus(req, res){
    try {
      const sql = "SELECT * FROM all_menus"
      db.query(sql, (err, results, fields) =>{
        if(err) throw err
        res.status(200).json({message: "Data berhasil diambil", data: results})
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async setPromoMenu(req, res){
    const {id, specialType} = req.body
    try {
      const sql = "UPDATE `all_menus` SET `specialType` = '"+specialType+"' WHERE `all_menus`.`id` = " + id
      db.query(sql, (err, result, field) =>{
        if(err) throw err
        const sqlFetch = "SELECT * FROM all_menus"
        db.query(sqlFetch, (err, results, fields) =>{
          if(err) throw err
          res.status(200).json({message: "Data berhasil diupdate", data: results})
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async setStatusMenu(req, res){
    const {id, status} = req.body
    try {
      const sql = "UPDATE `all_menus` SET `status` = '"+status+"' WHERE `all_menus`.`id` = " + id
      db.query(sql, (err, result, field) =>{
        if(err) throw err
        const sqlFetch = "SELECT * FROM all_menus"
        db.query(sqlFetch, (err, results, fields) =>{
          if(err) throw err
          res.status(200).json({message: "Data berhasil diupdate", data: results})
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async updateMenu(req, res){
    const {id, name, variant, price} = req.body
    try {
      const sql = "UPDATE `all_menus` SET `name` = '"+name+"', `variant` = '"+variant+"', `price` = '"+price+"' WHERE `all_menus`.`id` = "+id
      db.query(sql, (err, result, field) =>{
        if(err) throw err
        const sqlFetch = "SELECT * FROM all_menus"
        db.query(sqlFetch, (err, results, fields) =>{
          if(err) throw err
          res.status(200).json({message: "Data berhasil diupdate", data: results, confirm: true})
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AdminController