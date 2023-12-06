import user from "../models/user.js";
import models from "../config/Database.js";

export const getOrganization = async(req, res) => {
    try {
        const organization = await models._organization.findAll();
        res.json(organization);
    } catch (error) {
        console.log(error);
    }
}