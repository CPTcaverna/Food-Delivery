import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        if (products.length === 0) {
            return res.status(404).json({ message: "Produtos não encotrados" });
        }

        res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const {user} = req;
        const { id } = req.params;
        
        if(!user?.admin){
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!id) {
            return res.status(400).json({ message: "ID não encontrado " })
        }
        const product = await prisma.product.delete(
            {
                where: {
                    id: id
                }
            }
        )
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        return res.status(204).json({ message: "Item apagado com sucesso" });

    }
    catch (error : any) {
        if(error.code === "P2025"){
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        return res.status(500).json({ message: "Internal server error" });

    }


}