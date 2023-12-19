import models from "../config/Database.js";

export const addDonation = async (req, res) => {
  const {
    id_donatur,
    tanggal,
    deskripsi,
    jenis_makanan,
    jumlah_makanan,
    id_permintaan,
  } = req.body;

  try {
    const donation = await models.donation.create({
      id_donatur,
      tanggal,
      deskripsi,
      jenis_makanan,
      jumlah_makanan,
      id_permintaan,
    });

    return res.status(201).json({
      status: "success",
      code: 200,
      message: "Data berhasil ditambahkan",
      data: {
        id: donation.id,
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

export const getDonations = async (req, res) => {
  try {
    const donations = await models.donation.findAll();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data berhasil diambil",
      data: donations,
      total_items: donations.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};
