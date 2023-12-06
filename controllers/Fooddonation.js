import user from "../models/user.js";
import models from "../config/Database.js";

export const getFooddonation = async(req, res) => {
    try {
        const fooddonation = await models._food_donation.findAll();
        res.json(fooddonation);
    } catch (error) {
        console.log(error);
    }
}