import express from "express";
import "dotenv/config.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
const app = express();
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(cookieParser());

app.use("/api", router);

app.listen(9000, () => console.log("Server running at port 9000"));
