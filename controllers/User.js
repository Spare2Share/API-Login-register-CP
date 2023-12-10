import models from "../config/Database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const users = await models._user.findAll({
      attributes: [
        "id",
        "username",
        "fullname",
        "email",
        "alamat",
        "kota",
        "provinsi",
        "nomor_telepon",
      ],
    });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models._user.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    fullname,
    email,
    alamat,
    kota,
    provinsi,
    nomor_telepon,
    peran,
  } = req.body;

  try {
    await models._user.update(
      {
        username,
        fullname,
        email,
        alamat,
        kota,
        provinsi,
        nomor_telepon,
        peran,
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

export const register = async (req, res) => {
  const { username, fullname, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await models._user.create({
      username: username,
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await models._user.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user.id;
    const email = user.email;
    const fullname = user.fullname;

    const accessToken = jwt.sign(
      { userId, email, fullname },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, email, fullname },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    await models._user.update(
      { refresh_Token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ accessToken, id: user.id });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const changeUserPassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confPassword } = req.body;

  if (newPassword !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  try {
    const user = await models._user.findOne({
      where: {
        id,
      },
    });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.status(201).json({ msg: "Password berhasil diubah" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await models._user.findAll({
      where: {
        refresh_Token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user.id;
        const email = user.email;
        const fullname = user.fullname;
        console.log(fullname);
        const accessToken = jwt.sign(
          { userId, email, fullname },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await models._user.findAll({
    where: {
      refresh_Token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await models._user.update(
    { refreshToken: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
