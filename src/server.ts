import express from "express";
import dotenv from "dotenv";
import api from "./routes/api";
import cors from "cors";

dotenv.config();
const server = express();

server.use(cors());

server.use(express.json());

server.use(api);

server.listen(process.env.PORT, () => console.log("Running on - 3000"));
