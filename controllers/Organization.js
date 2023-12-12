import models from "../config/Database.js";

export const getOrganization = async (req, res) => {
  try {
    const organizations = await models.organization.findAll({});
    res.status(200).json({ organizations });
  } catch (error) {
    console.log(error);
  }
};

export const getOrganizationProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await models.organization.findOne({
      where: {
        id: id,
      },
      include: ["account", "donation_requests", "recipient_histories"],
    });
    res.status(200).json({ organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOrganizationProfile = async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, alamat, kota, provinsi, nomor_telepon } = req.body;

  try {
    await models.organization.update(
      {
        nama,
        deskripsi,
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

    res.status(201).json({ msg: "Profile organization berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
