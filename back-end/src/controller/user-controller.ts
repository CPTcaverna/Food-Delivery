import type { Request, Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        //dto
        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        const userInfos = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const token = jwt.sign(userInfos, `${process.env.JWT_SECRET}`)

        res.cookie("user", token, { maxAge: 18000000 });

        res.status(200).json(userInfos);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, cep } = req.body;
        //dto
        if (!name || !email || !password || !cep) {
            return res.status(400).json({ message: "Nome, email, senha e cep são obrigatórios" });
        }
        // if (password.length < 8) {
        //   return res.status(400).json({ message: "Password must be at least 8 characters long" });
        // }
        // if (!email.includes("@")) {
        //   return res.status(400).json({ message: "Invalid email" });
        // }
        // if (!cep.match(/^\d{5}-\d{3}$/)) {
        //   return res.status(400).json({ message: "Invalid CEP" });
        // }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (userExists) {
            return res.status(409).json({ message: "Email já está em uso" });
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cep
            }
        });

        res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const auth = async (req: Request, res: Response) => {
    try {
        

        res.status(200).json(req.user);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logout = async (req: Request, res: Response) => {
    const { user } = req.cookies;

    if (!user) {
        return res.status(400).json({ message: "No user is currently logged in" });
    }
    res.clearCookie("user");
    res.status(200).json({ message: "Logged out successfully" });
}

const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
}



export { login, getUsers, register, auth, logout };