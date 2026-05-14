import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        if(products.length === 0 ){
            return res.status(404).json({ message: "Produtos não encotrados" });
        }

        res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}