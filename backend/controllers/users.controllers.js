const db = require('../databases')

class UserController{
  static async getClient(req,res){
    try {
      const sql = `SELECT * FROM users`
      db.query(sql, (err, results, fields)=>{
        if(err) {
          throw err
        }else{
          res.status(200).json({message:"Data ditemukan", data:results})
        }
        
      })
    } catch (error) {
      
    }
  }

  static async registerClient(req, res){
    const {name, phone} = req.body
    var setSql = ""
    try {
      const onlyLettersPattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
      if(!name.match(onlyLettersPattern)){
        return res.json({err : "No special characters and no numbers, please!", status: 400})
      }
      // CEK APAKAH USER PERNAH MENDAFTAR DENGAN NO HP TERSEBUT
      const sql = `SELECT * FROM users WHERE phone ='${phone}'`
      db.query(sql, (err, results, fields)=>{
        if (err) throw err;
        // JIKA ADA, UBAH NAMANYA
        if(results.length == 1){
          const usersID = results[0].id
          setSql = `UPDATE users SET name = '${name}' WHERE users . id = '${usersID}'`
        // JIKA TIDAK ADA, BUAT PENGGUNA BARU
        }else{
          setSql = `INSERT INTO users (id, name, phone) VALUES (NULL, '${name}', '${phone}')`
        }
        db.query(setSql, (err, results, fields)=>{
          if (err) throw err;
          res.sendStatus(200)
      })
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getMenuType(req, res){
    try {
      const sql = "SELECT * FROM menu_type"
      db.query(sql, (err, results, fields) =>{
        if(err) throw err
        res.status(200).json({message:"Data ditemukan", data:results})
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getMenuDetails(req, res){
    try{
      const sql = `SELECT * FROM all_menus  WHERE status = '1' and specialType = '0'`
      db.query(sql, (err, results, fields) =>{
        if (err) throw err
        res.status(200).json({message : "Data menu berhasil diambil", data: results})
      })
    }catch(error){
      console.log(error)
    }
  }

  static async getSpecialMenu(req, res){
    try {
      const sql = "SELECT * FROM all_menus WHERE specialType = '1' AND status = '1'"
      db.query(sql, (err, results, fields)=>{
        if (err) throw err
        res.status(200).json({message: "Data menu special berhasil diambil", data:results})
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async postOrders(req, res){
    const {name, table, total, orders} = req.body
    try{
      const sql = "INSERT INTO `orders` (`id`, `name`, `table`, `total`, `orders`, `status`, `visible`) VALUES (NULL, '"+name+"', '"+table+"', '"+total+"', '"+orders+"', '0', '1')"
      db.query(sql, (err, results, fields) =>{
        if(err) throw err
        res.status(200).json({message: "Orders berhasil dikirim!"})
      })
    }catch(error){
      console.log(error)
    }
  }
}

module.exports = UserController