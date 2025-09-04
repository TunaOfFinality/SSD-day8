import userService from "../services/userService.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userController = {
  getAllUsers: async (req, res) => {
    try{
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch(err) {
      res.status(500).json(err)
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userService.getUserById(id)
      res.status(200).json(user)
    } catch(err) {
      res.status(500).json(err)
    }
    
  },
  create: async (req, res) => {
    try{
      const { name, password, confirmPassword, age, phone } = req.body
      if(password !== confirmPassword) {
        res.status(400).json({
          message: "Password not match"
        })
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userService.create(name, hashedPassword, age, phone)
      res.status(201).json(user)
    } catch(err){
      res.status(500).json(err)
    }
    
  },
  login: async (req, res) => {
    const { username, password } = req.body
    const user = await userService.getUserByUsername(username);
    if(!user) {
      res.status(401).json({
        message: "Username or Password incorrect"
      })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      res.status(401).json({
        message: "Username or Password incorrect"
      })
    }
    const jwt_secret = process.env.JWT_SECRET
    const payload = { username: user.name, userId: user.id}
    const token = jwt.sign(payload, jwt_secret, { expiresIn: "3d" });
    res.status(200).json({
      token: token
    })
  }
}

export default userController