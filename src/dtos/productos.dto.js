import { body, param } from "express-validator";

export const crearProductoDTO = [
  body("id").isInt({ min: 1 }).withMessage("El id debe ser un entero positivo."),
  body("nombre")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio."),
  body("tipo")
    .isIn(["juego", "consola"])
    .withMessage("El tipo debe ser 'juego' o 'consola'."),
  body("precio")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo."),
  body("cantidad")
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un número entero no negativo."),
  body("imagenUrl")
    .optional()
    .isURL()
    .withMessage("Debe ser una URL de imagen válida."),
];

export const actualizarProductoDTO = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id de la URL debe ser un entero positivo."),
  body("nombre")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre debe ser texto."),
  body("tipo")
    .optional()
    .isIn(["juego", "consola"])
    .withMessage("El tipo debe ser 'juego' o 'consola'."),
  body("precio")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo."),
  body("cantidad")
    .optional()
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un número entero no negativo."),
  body("imagenUrl")
    .optional()
    .isURL()
    .withMessage("Debe ser una URL de imagen válida."),
];