import express from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js"

const router= express.Router()

router.route("/create-todo").post(verifyJWT,createTodo)
router.route("/update-todo/:id").patch(verifyJWT,updateTodo)
router.route("/delete-todo/:id").delete(verifyJWT,deleteTodo)
router.route("/fetch-todos").get(verifyJWT,getAllTodos)

export default router