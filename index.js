import express from "express";
import "dotenv/config.js";
import bodyParser from "body-parser";
// import db from "./config/Database.js";
import router from "./routes/index.js";
// import initModels from "./models/init-models.js";
const app = express();
app.use(bodyParser.json());
// const sequelize = db;
// initModels(sequelize);
import cookieParser from "cookie-parser";
import cors from "cors";


try {
    // await db.authenticate();
    // console.log('Database Connected...');
    app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
    app.use(cookieParser());
    app.use('/api',router);
    app.listen(9000,()=> console.log('Server running at port 9000'));
} catch (error) {
    console.error(error);
}

