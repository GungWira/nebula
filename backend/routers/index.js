const {Router} = require("express")
const userRouter = require('./users.router')
const adminRouter = require('./admin.router')

const router = Router()
router.use(userRouter)
router.use(adminRouter)

module.exports = router