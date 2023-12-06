import user from "../models/user.js";
import models from "../config/Database.js";

export const getDonationrequest = async(req, res) => {
    try {
        const donationrequest = await models._donation_request.findAll();
        res.json(donationrequest);
    } catch (error) {
        console.log(error);
    }
}