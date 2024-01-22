import express from "express";
import dotenv from "dotenv";
import api from "./routes/api";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

dotenv.config();
const server = express();

server.use(cors());

server.use(express.json());

server.use(bodyParser.json());

server.use(api);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

server.listen(process.env.PORT, () => console.log("Running on - 3000"));
