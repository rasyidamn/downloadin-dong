import express from "express"
import { downloadVideo, getVideoInfo } from "../controller/controller.js"

const router = express.Router()

router.post("/video-info", getVideoInfo)
router.get("/video-download", downloadVideo)

export default router