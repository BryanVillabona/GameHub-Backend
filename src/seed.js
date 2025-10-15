import { conectarBD, obtenerBD } from "./config/db.js";

async function seed() {
  await conectarBD();
  const db = obtenerBD();

  console.log("Limpiando colecciones existentes...");
  await db.collection("productos").deleteMany({});

  // --- Catálogo Extenso de Productos en COP ---
  const productos = [
    // Consolas
    {
      id: 1,
      nombre: "PlayStation 5",
      tipo: "consola",
      precio: 2500000, // ~2.5M COP
      cantidad: 15,
    },
    {
      id: 2,
      nombre: "Xbox Series X",
      tipo: "consola",
      precio: 2400000, // ~2.4M COP
      cantidad: 12,
    },
    {
      id: 3,
      nombre: "Nintendo Switch OLED",
      tipo: "consola",
      precio: 1800000, // ~1.8M COP
      cantidad: 25,
    },
    // Juegos de PlayStation
    {
      id: 4,
      nombre: "Marvel's Spider-Man 2",
      tipo: "juego",
      precio: 290000, // ~290k COP
      cantidad: 30,
    },
    {
      id: 5,
      nombre: "God of War Ragnarök",
      tipo: "juego",
      precio: 250000, // ~250k COP
      cantidad: 28,
    },
    {
      id: 6,
      nombre: "Final Fantasy VII Rebirth",
      tipo: "juego",
      precio: 290000, // ~290k COP
      cantidad: 22,
    },
    // Juegos de Xbox
    {
      id: 7,
      nombre: "Starfield",
      tipo: "juego",
      precio: 280000, // ~280k COP
      cantidad: 18,
    },
    {
      id: 8,
      nombre: "Halo Infinite",
      tipo: "juego",
      precio: 240000, // ~240k COP
      cantidad: 35,
    },
    {
      id: 9,
      nombre: "Forza Horizon 5",
      tipo: "juego",
      precio: 240000, // ~240k COP
      cantidad: 40,
    },
    // Juegos de Nintendo Switch
    {
      id: 10,
      nombre: "The Legend of Zelda: Tears of the Kingdom",
      tipo: "juego",
      precio: 290000, // ~290k COP
      cantidad: 50,
    },
    {
      id: 11,
      nombre: "Super Mario Bros. Wonder",
      tipo: "juego",
      precio: 250000, // ~250k COP
      cantidad: 45,
    },
    {
      id: 12,
      nombre: "Pokémon Escarlata",
      tipo: "juego",
      precio: 250000, // ~250k COP
      cantidad: 38,
    },
  ];

  await db.collection("productos").insertMany(productos);
  console.log("✅ Catálogo de productos en COP insertado con éxito.");

  // --- Creación del Usuario Administrador ---
  const usuarios = db.collection("usuarios");
  const adminEmail = "admin@gamehub.com";

  const adminExistente = await usuarios.findOne({ email: adminEmail });

  if (!adminExistente) {
    await usuarios.insertOne({
      id: 1,
      nombre: "Administrador",
      email: adminEmail,
      password: "admin",
      rol: "admin",
    });
    console.log("🚀 Usuario administrador creado con éxito.");
  } else {
    console.log("ℹ️ El usuario administrador ya existe.");
  }

  console.log("\nBase de datos poblada y lista para usar. ✨");
  process.exit();
}

seed();