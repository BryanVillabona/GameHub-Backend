export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "GameHub API",
    version: "1.0.0",
    description: "API para la gestión de inventario y ventas de la tienda de videojuegos GameHub."
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor local de desarrollo"
    }
  ],
  paths: {
    "/api/v1/productos": {
      get: {
        summary: "Obtener todos los productos",
        description: "Devuelve una lista completa del catálogo de productos.",
        tags: ["Productos"],
        responses: {
          "200": {
            description: "Lista de productos obtenida con éxito.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { "$ref": "#/components/schemas/Producto" }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Crear un nuevo producto",
        description: "Registra un nuevo producto en la base de datos (requiere rol de admin).",
        tags: ["Productos"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { "$ref": "#/components/schemas/ProductoInput" } } }
        },
        responses: {
          "201": { "description": "Producto creado exitosamente." },
          "400": { "description": "Datos de entrada inválidos." }
        }
      }
    },
    "/api/v1/productos/{id}": {
      get: {
        summary: "Obtener un producto por ID",
        tags: ["Productos"],
        parameters: [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        responses: {
          "200": {
            description: "Producto encontrado.",
            content: { "application/json": { schema: { "$ref": "#/components/schemas/Producto" } } }
          },
          "404": { "description": "Producto no encontrado." }
        }
      },
      patch: {
        summary: "Actualizar un producto",
        description: "Actualiza parcialmente un producto existente (requiere rol de admin).",
        tags: ["Productos"],
        parameters: [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        requestBody: {
          content: { "application/json": { schema: { "$ref": "#/components/schemas/ProductoUpdateInput" } } }
        },
        responses: {
          "200": { "description": "Producto actualizado." },
          "404": { "description": "Producto no encontrado." }
        }
      },
      delete: {
        summary: "Eliminar un producto",
        description: "Elimina un producto del inventario (requiere rol de admin).",
        tags: ["Productos"],
        parameters: [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        responses: {
          "200": { "description": "Producto eliminado." },
          "404": { "description": "Producto no encontrado." }
        }
      }
    },
    "/api/v1/auth/register": {
      post: {
        summary: "Registrar un nuevo usuario",
        tags: ["Autenticación"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { "$ref": "#/components/schemas/RegistroInput" } } }
        },
        responses: {
          "201": { "description": "Usuario registrado exitosamente." },
          "400": { "description": "El correo ya está registrado." }
        }
      }
    },
    "/api/v1/auth/login": {
      post: {
        summary: "Iniciar sesión",
        tags: ["Autenticación"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { "$ref": "#/components/schemas/LoginInput" } } }
        },
        responses: {
          "200": {
            description: "Login exitoso.",
            content: { "application/json": { schema: { "$ref": "#/components/schemas/Usuario" } } }
          },
          "401": { "description": "Credenciales inválidas." }
        }
      }
    },
    "/api/v1/ventas": {
      post: {
        summary: "Registrar una nueva venta",
        description: "Crea un nuevo registro de venta y descuenta el stock de los productos.",
        tags: ["Ventas"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { "$ref": "#/components/schemas/VentaInput" } } }
        },
        responses: {
          "201": { "description": "Venta registrada con éxito." },
          "400": { "description": "Stock insuficiente o producto no encontrado." }
        }
      }
    },
    "/api/v1/ventas/cliente/{clienteId}": {
      get: {
        summary: "Obtener historial de pedidos de un cliente",
        tags: ["Ventas"],
        parameters: [
          { "name": "clienteId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        responses: {
          "200": { "description": "Historial de pedidos del cliente." },
          "500": { "description": "Error al obtener los pedidos." }
        }
      }
    }
  },
  components: {
    schemas: {
      Producto: {
        type: "object",
        properties: {
          _id: { type: "string", example: "663d5a9b8f2d1e1a3c7b8e1a" },
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "PlayStation 5" },
          tipo: { type: "string", example: "consola" },
          precio: { type: "number", example: 2500000 },
          cantidad: { type: "integer", example: 15 },
          imagenUrl: { type: "string", example: "https://ejemplo.com/ps5.png" }
        }
      },
      ProductoInput: {
        type: "object",
        required: ["id", "nombre", "tipo", "precio", "cantidad"],
        properties: {
          id: { type: "integer" },
          nombre: { type: "string" },
          tipo: { type: "string", enum: ["juego", "consola"] },
          precio: { type: "number" },
          cantidad: { type: "integer" },
          imagenUrl: { type: "string" }
        }
      },
      ProductoUpdateInput: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          tipo: { type: "string", enum: ["juego", "consola"] },
          precio: { type: "number" },
          cantidad: { type: "integer" },
          imagenUrl: { type: "string" }
        }
      },
      Usuario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 2 },
          nombre: { type: "string", example: "Carlos Lopez" },
          email: { type: "string", example: "carlos@correo.com" },
          rol: { type: "string", example: "cliente" }
        }
      },
      RegistroInput: {
        type: "object",
        required: ["nombre", "email", "password"],
        properties: {
          nombre: { type: "string" },
          email: { type: "string" },
          password: { type: "string" }
        }
      },
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" }
        }
      },
      VentaInput: {
        type: "object",
        required: ["clienteId", "productos", "total"],
        properties: {
          clienteId: { type: "integer" },
          productos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                productoId: { type: "integer" },
                cantidad: { type: "integer" }
              }
            }
          },
          total: { type: "number" }
        }
      }
    }
  },
  tags: [
    { name: "Productos", description: "Operaciones sobre el inventario de productos" },
    { name: "Autenticación", description: "Registro y login de usuarios" },
    { name: "Ventas", description: "Gestión de ventas y pedidos" }
  ]
};