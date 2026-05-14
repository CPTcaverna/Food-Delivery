import { Router } from "express";
import { getUsers, login, register, auth, logout } from "./controller/user-controller.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { getProducts, deleteProduct } from "./controller/product-controller.js";

export const router = Router();


//rotas de Usuarios
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

router.get("/users", getUsers);


//rotas de produto
router.get("/products", getProducts);
router.delete("/products/:id", authMiddleware, deleteProduct)