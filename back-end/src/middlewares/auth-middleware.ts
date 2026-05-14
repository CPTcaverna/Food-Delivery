import type { NextFunction } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.user;

    if (!`${process.env.JWT_SECRET}`) {
        return res.status(500).json({ message: "JWT secret is not defined" });
    }

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.user = decoded;
        if(!req.user) return res.status(401).json({ message: "Unauthorized" }  )
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

