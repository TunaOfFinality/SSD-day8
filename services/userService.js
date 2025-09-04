import User from "../models/User.js"

const userService = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (id) => {
    return await User.findById(id); 
  },
  getUserByUsername: async (username) => {
    return await User.findOne({ name: username});
  },
  create: async(name, password, age, phone) => {
    return await User.create({
      name, password, age, phone
    })
  }
}

export default userService