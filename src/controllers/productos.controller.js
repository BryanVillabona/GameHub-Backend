import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productos.services.js";

export async function obtenerTodosLosProductos(req, res) {
  try {
    const productos = await obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos." });
  }
}

export async function obtenerProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const producto = await obtenerProductoPorId(id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado." });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
}

export async function crearUnProducto(req, res) {
  try {
    const result = await crearProducto(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function actualizarUnProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await actualizarProducto(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function eliminarUnProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await eliminarProducto(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}