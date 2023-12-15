import user from "../models/user.js";
import models from "../config/Database.js";

export const getDonationrequest = async(req, res) => {
    try {
        const donationrequest = await models.donation_request.findAll();
        res.status(200).json({ donationrequest });
    } catch (error) {
        console.log(error);
    }
}

export const getDonationrequestProfile = async (req, res) => {
    const { id } = req.params;
    try {
      const donationrequest = await models.donation_request.findOne({
        where: {
          id: id,
        },
        include: ["organization",],
      });
      res.status(200).json({ donationrequest });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const updateDonationrequestProfile = async (req, res) => {
    const { id } = req.params;
    const { tanggal, deskripsi, jenis_makanan } = req.body;
  
    try {
      await models.donation_request.update(
        {
          tanggal,
          deskripsi,
          jenis_makanan,
        },
        {
          where: {
            id,
          },
        }
      );
  
      res.status(201).json({ msg: "Profile donation request berhasil diupdate" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
