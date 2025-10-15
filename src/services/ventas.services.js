import { obtenerBD } from "../config/db.js";

const COLECCION_VENTAS = "ventas";
const COLECCION_PRODUCTOS = "productos";

export async function registrarVenta(datos) {
  const { clienteId, productos, total } = datos;
  const db = obtenerBD();
  const session = db.client.startSession();

  try {
    let ventaRegistrada;
    await session.withTransaction(async () => {
      for (const item of productos) {
        const productoDB = await db.collection(COLECCION_PRODUCTOS).findOne({ id: item.productoId }, { session });

        if (!productoDB) {
          throw new Error(`Producto con ID ${item.productoId} no encontrado.`);
        }
        if (productoDB.cantidad < item.cantidad) {
          throw new Error(`Stock insuficiente para el producto: ${productoDB.nombre}.`);
        }

        const nuevoStock = productoDB.cantidad - item.cantidad;
        await db.collection(COLECCION_PRODUCTOS).updateOne(
          { id: item.productoId },
          { $set: { cantidad: nuevoStock } },
          { session }
        );
      }

      const nuevaVenta = {
        clienteId: datos.clienteId,
        productos,
        total,
        fecha: new Date(),
      };
      
      const resultado = await db.collection(COLECCION_VENTAS).insertOne(nuevaVenta, { session });
      
      ventaRegistrada = { ...nuevaVenta, _id: resultado.insertedId };
    });
    
    return { message: "Venta registrada con éxito.", venta: ventaRegistrada };
  } finally {
    await session.endSession();
  }
}

export async function obtenerVentas() {
    return await obtenerBD().collection(COLECCION_VENTAS).find().toArray();
}

export async function obtenerVentasPorCliente(clienteId) {
    const db = obtenerBD();
    
    // Convertimos el string del ID a un ObjectId de MongoDB para la consulta
    const idNumerico = parseInt(clienteId);

    const pipeline = [
        // 1. Encuentra todas las ventas que coincidan con el clienteId
        { $match: { clienteId: idNumerico } },
        // 2. "Desenrolla" el array de productos para procesar cada uno individualmente
        { $unwind: '$productos' },
        // 3. Busca en la colección 'productos' por cada productoId
        {
            $lookup: {
                from: 'productos',
                localField: 'productos.productoId',
                foreignField: 'id',
                as: 'detalleProducto'
            }
        },
        // 4. Agrupa todo de nuevo en el formato de pedido original
        {
            $group: {
                _id: '$_id',
                fecha: { $first: '$fecha' },
                total: { $first: '$total' },
                productos: {
                    $push: {
                        cantidad: '$productos.cantidad',
                        // Tomamos el primer (y único) elemento del detalle
                        producto: { $arrayElemAt: ['$detalleProducto', 0] }
                    }
                }
            }
        },
        // 5. Ordena los pedidos del más reciente al más antiguo
        { $sort: { fecha: -1 } }
    ];

    const pedidos = await db.collection(COLECCION_VENTAS).aggregate(pipeline).toArray();
    return pedidos;
}