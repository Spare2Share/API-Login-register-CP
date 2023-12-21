import models from "../config/Database.js";

export const getOrganization = async (req, res) => {
  try {
    const organizations = await models.organization.findAll({});
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: organizations,
      total_items: organizations.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
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
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: organization,
      total_items: organization.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
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
