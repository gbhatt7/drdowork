import express from "express";
import { addUser, deleteUser, getUsers, updateUser, addemployeeUser, deleteemployeeUser, getemployeeUsers, updateemployeeUser, addtrainingUser, deletetrainingUser, gettrainingUsers, updatetrainingUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

router.get("/employee/", getemployeeUsers)

router.post("/employee/", addemployeeUser)

router.put("/employee/:id", updateemployeeUser)

router.delete("/employee/:id", deleteemployeeUser)

router.get("/training/", gettrainingUsers)

router.post("/training/", addtrainingUser)

router.put("/training/:id", updatetrainingUser)

router.delete("/training/:id", deletetrainingUser)

export default router