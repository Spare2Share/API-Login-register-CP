import models from "../config/Database.js";
import donation from "../models/donation.js";
import donation_request from "../models/donation_request.js";
import organization from "../models/organization.js";

export const addDonationHistory = async (req, res) => {
  const { id_donatur, id_donasi } = req.body;

  try {
    const donationHistory = await models.donation_history.create({
      id_donatur,
      id_donasi,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Data berhasil ditambahkan",
      data: {
        id: donationHistory.id,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const getDonationHistories = async (req, res) => {
  try {
    const donationHistories = await models.donation_history.findAll();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: donationHistories,
      total_items: donationHistories.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const getDonationHistoryByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const donationHistory = await models.donation_history.findAll({
      where: {
        id_donatur: id,
      },
      include: [
        {
          model: models.donation,
          as: "donation",
          include: [
            {
              model: models.donation_request,
              as: "donation_request",
            },
          ],
        },
      ],
    });

    donationHistory.length > 0
      ? res.status(200).json({
          status: "success",
          code: 200,
          message: "Data berhasil diambil",
          data: { donationHistory },
        })
      : res.status(400).json({
          status: "error",
          code: 400,
          message: "Gagal mengambil data. Data tidak ditemukan",
        });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};
