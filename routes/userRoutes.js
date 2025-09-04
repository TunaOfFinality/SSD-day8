import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const useUserRoute = async (router) => {
  router.get('/user', authMiddleware(), userController.getAllUsers)
  router.get('/user/:id', userController.getUserById)
  router.post('/user', userController.create)
  router.post('/login', userController.login)
}

export default useUserRoute