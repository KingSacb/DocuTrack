import "dotenv/config";
import express from "express";
import cors from "cors"

import userRouter from "./routes/user.route.js";
import requestRoutes from "./routes/request.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor andando en " + PORT));
