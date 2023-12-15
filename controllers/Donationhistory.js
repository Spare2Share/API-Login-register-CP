import user from "../models/user.js";
import models from "../config/Database.js";

export const postDonationhistory = async(req, res) => {
    try {
        const donationhistory = await models.donation_history.findAll();
        res.status(200).json({ donationhistory });
    } catch (error) {
        console.log(error);
    }
}

