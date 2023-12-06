import { Sequelize } from "sequelize";
import initModels from "../models/init-models.js";


const db = new Sequelize('food_donation-db','root','HQcAtj5ALbZ97FT',{
    host: "34.101.227.21",
    dialect: "mysql"
});
const models = initModels(db);
export default models;