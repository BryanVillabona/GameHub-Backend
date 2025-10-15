import { body } from 'express-validator';

// DTO para el nuevo formato de registro de ventas
export const registrarVentaDTO = [
    // Valida que el clienteId sea un ID válido de MongoDB
        body('clienteId').isInt({ min: 1 }).withMessage('El ID del cliente no es válido.'),
    
    // Valida que el total sea un número mayor que cero
    body('total').isFloat({ gt: 0 }).withMessage('El total debe ser un número positivo.'),
    
    // Valida que 'productos' sea un array con al menos un elemento
    body('productos').isArray({ min: 1 }).withMessage('Debe haber al menos un producto en la venta.'),
    
    // Valida cada objeto dentro del array 'productos'
    body('productos.*.productoId').isInt({ min: 1 }).withMessage('El ID del producto no es válido.'),
    body('productos.*.cantidad').isInt({ gt: 0 }).withMessage('La cantidad del producto debe ser un entero positivo.'),
];