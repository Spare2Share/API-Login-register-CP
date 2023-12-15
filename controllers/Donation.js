import user from "../models/user.js";
import models from "../config/Database.js";

export const postDonation = async(req, res) => {
    try {
        const donation = await models.donation.findAll();
        res.status(200).json({ donation });
    } catch (error) {
        console.log(error);
    }
}