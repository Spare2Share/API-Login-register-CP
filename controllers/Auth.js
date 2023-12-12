import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../config/Database.js";

export const register = async (req, res) => {
  const { email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const account = await models.account.create({
      email: email,
      password: hashPassword,
    });

    if (role == "User") {
      await models.user.create({
        id_account: account.id,
      });
    } else if (role == "Organization") {
      await models.organization.create({
        id_account: account.id,
      });
    }

    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const account = await models.account.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, account.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const accountId = account.id;
    const email = account.email;

    const accessToken = jwt.sign(
      { accountId, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { accountId, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    await models.account.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: accountId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ accessToken, id: accountId });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confPassword } = req.body;

  if (newPassword !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  try {
    const account = await models.account.findOne({
      where: {
        id,
      },
    });

    const match = await bcrypt.compare(oldPassword, account.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    account.password = hashPassword;
    await account.save();

    res.status(201).json({ msg: "Password berhasil diubah" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const account = await models.account.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!account) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const id = account.id;

        const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(402);
  const account = await models.account.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!account) return res.sendStatus(402);
  const accountId = account.id;
  await models.account.update(
    { refresh_token: null },
    {
      where: {
        id: accountId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
