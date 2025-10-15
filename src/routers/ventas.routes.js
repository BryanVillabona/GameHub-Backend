import { Router } from "express";
import {
  crearUnaVenta,
  obtenerTodasLasVentas,
} from "../controllers/ventas.controller.js";
import { registrarVentaDTO } from "../dtos/ventas.dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import { httpGetVentasPorCliente } from '../controllers/ventas.controller.js'; 

const router = Router();

router.get("/", obtenerTodasLasVentas);
router.post("/", registrarVentaDTO, validationDTO, crearUnaVenta);
router.get('/cliente/:clienteId', httpGetVentasPorCliente);

export default router;