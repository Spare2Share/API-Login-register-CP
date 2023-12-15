import user from "../models/user.js";
import models from "../config/Database.js";

export const postRecipienthistory = async(req, res) => {
    try {
        const recipienthistory = await models.recipient_history.findAll();
        res.json(recipienthistory);
    } catch (error) {
        console.log(error);
    }
}