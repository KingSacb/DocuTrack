import { Router } from "express";
import {RequestController} from "../controllers/request.controller.js"
import { verifyToken } from "../middlewares/jwt.middlware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", verifyToken, upload.single("file"), RequestController.createRequest);
router.get("/", verifyToken, RequestController.getUserRequests);

export default router;
