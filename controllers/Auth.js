import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../config/Database.js";

export const register = async (req, res) => {
  const { email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Password dan Confirm Password tidak sama",
    });
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

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registrasi berhasil",
      data: {
        id: account.id,
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

export const login = async (req, res) => {
  try {
    const account = await models.account.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, account.password);
    if (!match)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Password salah",
      });
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
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Login berhasil",
      data: {
        accessToken,
        accountId,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Email tidak ditemukan",
    });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confPassword } = req.body;

  if (newPassword !== confPassword)
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Password dan Confirm Password tidak sama",
    });

  try {
    const account = await models.account.findOne({
      where: {
        id,
      },
    });

    const match = await bcrypt.compare(oldPassword, account.password);
    if (!match)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Password salah",
      });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    account.password = hashPassword;
    await account.save();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Password berhasil diupdate",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(402).json({
        status: "error",
        code: 402,
        message: "Refresh token tidak ditemukan",
      });
    const account = await models.account.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!account)
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Akun tidak ditemukan",
      });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({
            status: "error",
            code: 403,
            message: err,
          });
        const id = account.id;

        const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({
          status: "success",
          code: 200,
          message: "Berhasil mengambil access token",
          data: {
            accessToken,
          },
        });
      }
    );
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(402).json({
      status: "error",
      code: 402,
      message: "Refresh token tidak ditemukan",
    });
  const account = await models.account.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!account)
    return res.status(402).json({
      status: "error",
      code: 402,
      message: "Akun tidak ditemukan",
    });
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
  return res.status(200).json({
    status: "success",
    code: 200,
    message: "Logout berhasil",
  });
};
