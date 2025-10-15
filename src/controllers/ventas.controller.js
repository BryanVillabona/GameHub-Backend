import {
  registrarVenta,
  obtenerVentas,
} from "../services/ventas.services.js";
import { obtenerVentasPorCliente } from '../services/ventas.services.js';

export async function crearUnaVenta(req, res) {
  try {
    const result = await registrarVenta(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerTodasLasVentas(req, res) {
  try {
    const ventas = await obtenerVentas();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las ventas." });
  }
}

export async function httpGetVentasPorCliente(req, res) {
    try {
        const { clienteId } = req.params;
        const pedidos = await obtenerVentasPorCliente(clienteId);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos del cliente.' });
    }
}