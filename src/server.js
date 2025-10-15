import express from "express";
import "dotenv/config";
import cors from "cors";
import { conectarBD } from "./config/db.js";
import routerProductos from "./routers/productos.routes.js";
import routerVentas from "./routers/ventas.routes.js";
import routerAuth from './routers/auth.routes.js';

// Config
const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: false
}));

// Rutas
const apiV1Router = express.Router();
apiV1Router.use("/productos", routerProductos);
apiV1Router.use("/ventas", routerVentas);
apiV1Router.use('/auth', routerAuth);

app.use("/api/v1", apiV1Router);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend activo!!!" });
});

// Executions
conectarBD().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`
    );
  });
});