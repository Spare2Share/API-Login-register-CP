import models from "../config/Database.js";

export const addDonationRequest = async (req, res) => {
  const {
    id_user = null,
    id_organization = null,
    tanggal,
    deskripsi,
    jenis_makanan,
    jumlah_makanan,
  } = req.body;
  try {
    const donation_request = await models.donation_request.create({
      id_user,
      id_organization,
      tanggal,
      deskripsi,
      jenis_makanan,
      jumlah_makanan,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Data berhasil ditambahkan",
      data: {
        id: donation_request.id,
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

export const getDonationRequest = async (req, res) => {
  try {
    const donationrequest = await models.donation_request.findAll({
      include: ["user", "organization"],
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: donationrequest,
      total_items: donationrequest.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const getDonationRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const donationrequest = await models.donation_request.findOne({
      where: {
        id: id,
      },
      include: ["user", "organization"],
    });
    donationrequest
      ? res.status(200).json({
          status: "success",
          code: 200,
          message: "Data berhasil diambil",
          data: { donationrequest },
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

export const updateDonationrequest = async (req, res) => {
  const { id } = req.params;
  const { tanggal, deskripsi, jenis_makanan, jumlah_makanan } = req.body;

  console.log(req.body);

  try {
    await models.donation_request.update(
      {
        tanggal,
        deskripsi,
        jenis_makanan,
        jumlah_makanan,
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
      message: "Data berhasil diupdate",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};
