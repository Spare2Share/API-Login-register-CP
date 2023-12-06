import models from "../config/Database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUser = async(req, res) => {
    try {
        const user = await models._user.findAll({
            attributes:['id','username','fullname','email','alamat','kota','provinsi','nomor_telepon']
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { username, fullname, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await models._user.create({
            username: username,
            fullname: fullname,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req,res) => {
    try {
        console.log(req.body)
        const user = await models._user.findOne({
            where:{
                email: req.body.email
            }});
        console.log(user.email)
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match)return res.status(400).json({msg: "Wrong Password"});
        const userId = user.id;
        const email = user.email;
        const fullname = user.fullname;
        console.log(fullname)
        const accessToken = jwt.sign({userId, email, fullname}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '25s'
        });
        const refreshToken = jwt.sign({userId, email, fullname}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await  models._user.update({refresh_Token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

export const refreshToken = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await models._user.findAll({
            where:{
                refresh_Token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user.id;
            const email = user.email;
            const fullname = user.fullname;
            console.log(fullname)
            const accessToken = jwt.sign({userId, email, fullname}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '25s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error); 
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await models._user.findAll({
            where:{
                refresh_Token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await models._user.update({refreshToken: null},{
            where:{
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}