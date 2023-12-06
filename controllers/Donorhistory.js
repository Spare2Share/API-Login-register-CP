import user from "../models/user.js";
import models from "../config/Database.js";

export const getDonorhistory = async(req, res) => {
    try {
        const donorhistory = await models._donor_history.findAll();
        res.json(donorhistory);
    } catch (error) {
        console.log(error);
    }
}