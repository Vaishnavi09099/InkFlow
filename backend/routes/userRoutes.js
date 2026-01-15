const express = require("express");
const {
    createUser,
    getUsers,
    getUsersById,
    updateUser,
    removeUser
 }
  = require("../controllers/userController");

const route = express.Router();




route.post("/users",createUser)

route.get("/users",getUsers)

route.get("/users/:id",getUsersById)

route.put("/users/:id",updateUser)

route.delete("/users/:id",removeUser)

module.exports = route