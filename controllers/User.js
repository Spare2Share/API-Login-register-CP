import models from "../config/Database.js";

export const getUser = async (req, res) => {
  try {
    const users = await models.user.findAll({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
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
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    res.status(201).json({ msg: "Profile user berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
