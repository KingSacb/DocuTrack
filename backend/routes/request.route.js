import { Router } from "express";
import {RequestController} from "../controllers/request.controller.js"
import { verifyToken } from "../middlewares/jwt.middlware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", verifyToken, upload.single("file"), RequestController.createRequest);
router.get("/", verifyToken, RequestController.getUserRequests);
router.get("/all", verifyToken, isAdmin, RequestController.getAllRequests);
router.put("/:id/status", verifyToken, RequestController.updateRequestStatus);
router.post("/:id/certificate", verifyToken, upload.single("certificate"), RequestController.uploadCertificate);
export default router;
