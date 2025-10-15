# 🎮 API de Inventario para Tienda de Videojuegos

<p align="center">
  <img src="./src/Img/logo-gamehub.png" alt="logo_videojuegos" width="350" height="300">
</p>

API RESTful desarrollada como parte de un taller académico para la gestión de inventario y ventas de una tienda de videojuegos y consolas.  
La plataforma permite administrar el catálogo de productos y registrar ventas, validando y actualizando el stock en tiempo real.

---

## 🚀 Características Principales

- **Gestión de Productos:** Sistema completo de CRUD (Crear, Leer, Actualizar, Eliminar) para los productos (juegos y consolas).  
**Sistema de Autenticación:** Registro y Login de usuarios con persistencia en MongoDB.
-   **Roles de Usuario:** Diferenciación entre roles de `'cliente'` y `'admin'`, con un usuario administrador por defecto.
- **Registro de Ventas:** Permite registrar ventas de productos existentes.  
- **Control de Inventario:** El stock de los productos se descuenta automáticamente con cada venta.  
- **Validación de Stock:** El sistema no permite registrar una venta si no hay suficiente stock disponible, devolviendo un mensaje de error claro.  
-   **Historial de Pedidos:** Endpoint para que un cliente pueda consultar su historial de compras.
- **API Versionada:** Todos los endpoints están bajo el prefijo `/api/v1` para garantizar la escalabilidad y mantenibilidad.  
- **Validación de Datos:** Implementación rigurosa de DTOs con *express-validator* para asegurar la integridad y el formato correcto de los datos de entrada.  
- **Manejo de CORS:** Configurado para permitir peticiones desde el frontend sin problemas de seguridad de origen cruzado.  
- **Manejo de Errores:** Respuestas claras y códigos de estado HTTP adecuados para cada situación (éxito, error de cliente, error de servidor).  

---

## 🧩 Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript.  
- **Express:** Framework para la construcción de la API REST.  
- **MongoDB:** Base de datos NoSQL para el almacenamiento de datos (usando el driver oficial).  
- **Dotenv:** Para la gestión segura de variables de entorno.  
- **Express-validator:** Para la validación de los datos de entrada (DTOs).  
- **CORS:** Para habilitar las solicitudes de origen cruzado desde el frontend.  

---

## ⚙️ Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1️⃣ Prerrequisitos
Asegúrate de tener instalados:

- Node.js (v18 o superior)
- npm
- MongoDB

### 2️⃣ Clonar el Repositorio

```bash
git clone https://github.com/BryanVillabona/GameHub-Backend.git
cd GameHub-Backend
```

### 3️⃣ Instalar Dependencias

```bash
npm install
```

### 4️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (adjunto hay un `.env.example`, borra la extención .example de este y te queda el `.env`) y añade las siguientes variables:

```env
MONGO_URI=mongodb://localhost:27017/
DB_NAME=tienda_videojuegos_db
PORT=4000
HOST_NAME=localhost
FRONTEND_URL=http://127.0.0.1:5500
```
Nota: Debes tener la replica set si lo quieres probar localmente, o en su defecto, usa MongoDB Atlas.

### 5️⃣ Poblar la Base de Datos (Opcional)

Para insertar los datos de prueba y verificar la conexión, ejecuta el script de inicialización:

```bash
npm run seed
```

### 6️⃣ Iniciar el Servidor

```bash
npm run dev
```

El servidor estará escuchando en [http://localhost:4000](http://localhost:4000).

---

## 📘 Documentación de la API (Endpoints)

Puedes ingresar a la documentación de la API en el siguiente enlace:

[▶️ **Ver Documentación**](https://ry3wzife42.apidog.io/)

**URL Base:** `http://localhost:4000/api/v1`

---

### 🕹️ Módulo de Productos

#### **GET /productos**

**Descripción:** Obtiene la lista completa de todos los productos (juegos y consolas) en el inventario.  
**Request:** No requiere body.

**Success Response (200 OK):**

```json
[
  {
    "_id": "663d5a9b8f2d1e1a3c7b8e1a",
    "id": 1,
    "nombre": "The Legend of Zelda: Breath of the Wild",
    "tipo": "juego",
    "precio": 59.99,
    "cantidad": 10
  },
  {
    "_id": "663d5a9b8f2d1e1a3c7b8e1b",
    "id": 2,
    "nombre": "PlayStation 5",
    "tipo": "consola",
    "precio": 499.99,
    "cantidad": 5
  }
]
```

---

#### **GET /productos/:id**

**Descripción:** Obtiene la información detallada de un producto específico por su ID.  
**Request (Params):** `/productos/2`

**Success Response (200 OK):**

```json
{
  "_id": "663d5a9b8f2d1e1a3c7b8e1b",
  "id": 2,
  "nombre": "PlayStation 5",
  "tipo": "consola",
  "precio": 499.99,
  "cantidad": 5
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Producto no encontrado."
}
```

---

#### **POST /productos**

**Descripción:** Registra un nuevo producto en el inventario.  
**Request (Body):**

```json
{
  "id": 4,
  "nombre": "Nintendo Switch OLED",
  "tipo": "consola",
  "precio": 349.99,
  "cantidad": 15
}
```

**Success Response (201 Created):**

```json
{
  "message": "Producto creado correctamente."
}
```

**Error Response (400 Bad Request):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "accesorio",
      "msg": "El tipo debe ser 'juego' o 'consola'.",
      "path": "tipo",
      "location": "body"
    }
  ]
}
```

---

#### **PATCH /productos/:id**

**Descripción:** Actualiza parcialmente los datos de un producto existente.  
**Request (Params & Body):** `/productos/2`

```json
{
  "precio": 479.99,
  "cantidad": 4
}
```

**Success Response (200 OK):**

```json
{
  "message": "Producto actualizado."
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Producto no encontrado."
}
```

---

#### **DELETE /productos/:id**

**Descripción:** Elimina un producto del inventario.  
**Request (Params):** `/productos/3`

**Success Response (200 OK):**

```json
{
  "message": "Producto eliminado."
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Producto no encontrado."
}
```

---

# 👤 Módulo de Autenticación

## POST /auth/register  
**Descripción:** Registra un nuevo usuario en la plataforma con el rol de 'cliente'.

### Request (Body):

**JSON**
```json
{
  "nombre": "Carlos Lopez",
  "email": "carlos@correo.com",
  "password": "unacontrasena123"
}
```

### Success Response (201 Created):

**JSON**
```json
{
  "message": "Usuario registrado exitosamente."
}
```

### Error Response (400 Bad Request):

**JSON**
```json
{
  "error": "El correo ya está registrado."
}
```

---

## POST /auth/login  
**Descripción:** Autentica a un usuario y devuelve sus datos (incluyendo el rol) sin la contraseña.

### Request (Body):

**JSON**
```json
{
  "email": "admin@gamehub.com",
  "password": "admin"
}
```

### Success Response (200 OK):

**JSON**
```json
{
    "_id": "68ec1428e2a8de24a21a55a4",
    "nombre": "Administrador",
    "email": "admin@gamehub.com",
    "rol": "admin"
}
```

### Error Response (401 Unauthorized):

**JSON**
```json
{
  "error": "Credenciales inválidas."
}
```

---

# 💰 Módulo de Ventas y Pedidos

## POST /ventas  
**Descripción:** Registra una nueva venta a partir de un carrito de compras, actualiza el stock de los productos y la asocia a un cliente.

### Request (Body):

**JSON**
```json
{
  "clienteId": "68ec1428e2a8de24a21a55a4",
  "productos": [
    { "productoId": 4, "cantidad": 1 },
    { "productoId": 10, "cantidad": 2 }
  ],
  "total": 870000
}
```

### Success Response (201 Created):

**JSON**
```json
{
  "message": "Venta registrada con éxito.",
  "venta": {
    "clienteId": "68ec1428e2a8de24a21a55a4",
    "productos": [
      { "productoId": 4, "cantidad": 1 },
      { "productoId": 10, "cantidad": 2 }
    ],
    "total": 870000,
    "fecha": "2025-10-12T22:30:00.000Z",
    "_id": "68ec14b2e2a8de24a21a55a8"
  }
}
```

---

## GET /ventas/cliente/:clienteId  
**Descripción:** Obtiene el historial de pedidos de un cliente específico, incluyendo los detalles completos de cada producto comprado.

### Request (Params):  
`/ventas/cliente/68ec1428e2a8de24a21a55a4`

### Success Response (200 OK):

**JSON**
```json
[
    {
        "_id": "68ec14b2e2a8de24a21a55a8",
        "fecha": "2025-10-12T22:30:00.000Z",
        "total": 870000,
        "productos": [
            {
                "cantidad": 1,
                "producto": {
                    "_id": "68ec13e9e2a8de24a21a559d",
                    "id": 4,
                    "nombre": "Marvel's Spider-Man 2",
                    "tipo": "juego",
                    "precio": 290000,
                    "cantidad": 29
                }
            },
            {
                "cantidad": 2,
                "producto": {
                    "_id": "68ec13e9e2a8de24a21a55a3",
                    "id": 10,
                    "nombre": "The Legend of Zelda: Tears of the Kingdom",
                    "tipo": "juego",
                    "precio": 290000,
                    "cantidad": 48
                }
            }
        ]
    }
]
```

---

## 🔗 Repositorio del Frontend

El frontend de esta aplicación, desarrollado con **HTML**, **CSS** y **JavaScript puro**, se encuentra en el siguiente repositorio:

> [▶️ **Ver Repositorio del Frontend**](https://github.com/BryanVillabona/GameHub-Frontend.git)

---

## 🎥 Video Demostrativo

En el siguiente video se explica el código y se muestra el funcionamiento completo de la aplicación, tanto del backend como del frontend.

> ▶️ **Ver Video**

---

## 👥 Integrantes

| Nombre Completo        | Rol         |
|-------------------------|-------------|
| Bryan Villabona            | Estudiante  |
| Sergio Lievano  | Estudiante  |
