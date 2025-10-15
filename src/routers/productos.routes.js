import { Router } from "express";
import {
  obtenerTodosLosProductos,
  obtenerProducto,
  crearUnProducto,
  actualizarUnProducto,
  eliminarUnProducto,
} from "../controllers/productos.controller.js";
import {
  crearProductoDTO,
  actualizarProductoDTO,
} from "../dtos/productos.dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";

const router = Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerProducto);
router.post("/", crearProductoDTO, validationDTO, crearUnProducto);
router.patch("/:id", actualizarProductoDTO, validationDTO, actualizarUnProducto);
router.delete("/:id", eliminarUnProducto);

export default router;