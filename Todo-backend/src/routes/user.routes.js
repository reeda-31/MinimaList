import { deleteUser, getUserProfile,updateUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import express from "express"
import { upload } from "../middleware/multer.middleware.js";

const router= express.Router()

router.route("/profile").get(verifyJWT,getUserProfile)
router.route("/update-profile").patch(verifyJWT,upload.single("avatar"),updateUserProfile)
router.route("/delete").delete(verifyJWT,deleteUser)

export default router