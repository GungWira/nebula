const {Router} = require('express')
const UserController = require('../controllers/users.controllers')

const router = Router()

router.get("/client/login", UserController.getClient)
router.post("/client/login", UserController.registerClient)
router.get("/client/menu/type", UserController.getMenuType)
router.get("/client/menu/detail", UserController.getMenuDetails)
router.get("/client/menu/special", UserController.getSpecialMenu)
router.post("/client/order", UserController.postOrders)
module.exports = router