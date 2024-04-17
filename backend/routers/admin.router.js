const {Router} = require("express")
const AdminController = require("../controllers/admin.controllers")

const router = Router()

router.post("/admin", AdminController.adminDashboard)
router.post("/admin/login", AdminController.loginAdmin)
router.get("/admin/orders", AdminController.getActiveOrders)
router.post("/admin/orders", AdminController.postCompleteOrder)
router.get("/admin/users", AdminController.getAllUsers)
router.get("/admin/menus", AdminController.getMenus)
router.post("/admin/menus/promo", AdminController.setPromoMenu)
router.post("/admin/menus/status", AdminController.setStatusMenu)
router.post("/admin/menus/update", AdminController.updateMenu)


module.exports = router