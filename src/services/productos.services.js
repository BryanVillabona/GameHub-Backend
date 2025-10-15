import { obtenerBD } from "../config/db.js";

const COLECCION = "productos";

export async function obtenerProductos() {
  return await obtenerBD().collection(COLECCION).find().toArray();
}

export async function obtenerProductoPorId(id) {
  return await obtenerBD().collection(COLECCION).findOne({ id });
}

export async function crearProducto(datos) {
  const { id, nombre, tipo, precio, cantidad, imagenUrl } = datos;
  // Validación adicional por si acaso
  if (!id || !nombre || !tipo || !precio || cantidad === undefined) {
    throw new Error("Faltan campos obligatorios para crear el producto.");
  }

  const producto = { id, nombre, tipo, precio, cantidad, imagenUrl };
  await obtenerBD().collection(COLECCION).insertOne(producto);
  return { message: "Producto creado correctamente." };
}

export async function actualizarProducto(id, datos) {
  const resultado = await obtenerBD()
    .collection(COLECCION)
    .updateOne({ id }, { $set: datos });
  if (resultado.matchedCount === 0) throw new Error("Producto no encontrado.");
  return { message: "Producto actualizado." };
}

export async function eliminarProducto(id) {
  const resultado = await obtenerBD().collection(COLECCION).deleteOne({ id });
  if (resultado.deletedCount === 0) throw new Error("Producto no encontrado.");
  return { message: "Producto eliminado." };
}