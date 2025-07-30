import "dotenv/config";
import express from "express";
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.route.js";
import requestRoutes from "./routes/request.route.js";

const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor andando en " + PORT));
