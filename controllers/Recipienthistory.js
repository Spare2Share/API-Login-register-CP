import models from "../config/Database.js";

export const addRecipientHistory = async (req, res) => {
  const { id_user = null, id_organization = null, id_permintaan } = req.body;

  try {
    const recipientHistory = await models.recipient_history.create({
      id_user,
      id_organization,
      id_permintaan,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Data berhasil ditambahkan",
      data: {
        id: recipientHistory.id,
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

export const getRecipientHistories = async (req, res) => {
  const { id_user = null, id_organization = null } = req.query;
  try {
    if (id_organization) {
      const recipientHistory = await models.recipient_history.findAll({
        where: {
          id_organization,
        },
        include: "donation_request",
      });

      return recipientHistory.length > 0
        ? res.status(200).json({
            status: "success",
            code: 200,
            message: "Data berhasil diambil",
            data: recipientHistory,
            total_items: recipientHistory.length,
          })
        : res.status(400).json({
            status: "error",
            code: 400,
            message: "Gagal mengambil data. Data tidak ditemukan",
          });
    }

    if (id_user) {
      const recipientHistory = await models.recipient_history.findAll({
        where: {
          id_user,
        },
        include: "donation_request",
      });

      return recipientHistory.length > 0
        ? res.status(200).json({
            status: "success",
            code: 200,
            message: "Data berhasil diambil",
            data: recipientHistory,
            total_items: recipientHistory.length,
          })
        : res.status(400).json({
            status: "error",
            code: 400,
            message: "Gagal mengambil data. Data tidak ditemukan",
          });
    }

    const recipientHistories = await models.recipient_history.findAll();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: recipientHistories,
      total_items: recipientHistories.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};
