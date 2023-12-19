import models from "../config/Database.js";

export const getUser = async (req, res) => {
  try {
    const users = await models.user.findAll({});
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: users,
      total_items: users.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models.user.findOne({
      where: {
        id: id,
      },
      include: [
        "account",
        "donations",
        "donation_histories",
        "recipient_histories",
      ],
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: user,
      total_items: user.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { nama, ttl, alamat, kota, provinsi, nomor_telepon } = req.body;

  try {
    await models.user.update(
      {
        nama,
        ttl,
        alamat,
        kota,
        provinsi,
        nomor_telepon,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Profile berhasil diupdate",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};
