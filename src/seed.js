import { conectarBD, obtenerBD } from "./config/db.js";

async function seed() {
  await conectarBD();
  const db = obtenerBD();

  console.log("Limpiando colecciones existentes...");
  await db.collection("productos").deleteMany({});

  // --- Catálogo Extenso de Productos ---
  const productos = [
    // Consolas
    {
      id: 1,
      nombre: "PlayStation 5",
      tipo: "consola",
      precio: 2500000,
      cantidad: 15,
      imagenUrl: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/04/04/16490754492411.jpg",
    },
    {
      id: 2,
      nombre: "Xbox Series X",
      tipo: "consola",
      precio: 2400000, 
      cantidad: 12,
      imagenUrl: "https://cms-assets.xboxservices.com/assets/f0/8d/f08dfa50-f2ef-4873-bc8f-bcb6c34e48c0.png?n=642227_Hero-Gallery-0_C2_857x676.png",
    },
    {
      id: 3,
      nombre: "Nintendo Switch OLED",
      tipo: "consola",
      precio: 1800000,
      cantidad: 25,
      imagenUrl: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_500/ncom/en_US/switch/videos/heg001-07060600/posters/oled-model",
    },
    // Juegos de PlayStation
    {
      id: 4,
      nombre: "Marvel's Spider-Man 2",
      tipo: "juego",
      precio: 290000,
      cantidad: 30,
      imagenUrl: "https://juegosdigitalescolombia.com/files/images/productos/1697557642-marvels-spider-man-2-ps5-pre-orden-0.jpg",
    },
    {
      id: 5,
      nombre: "God of War Ragnarök",
      tipo: "juego",
      precio: 250000,
      cantidad: 28,
      imagenUrl: "https://img.asmedia.epimg.net/resizer/v2/EWHQBRT75JNY7CR6CQB34O7TJY.jpg?auth=fd1cf7b860f17552f35bea22b00b6e73b75ad49561920a64a14a94d6ce5dfd2d&width=1472&height=828&smart=true",
    },
    {
      id: 6,
      nombre: "Final Fantasy VII Rebirth",
      tipo: "juego",
      precio: 290000,
      cantidad: 22,
      imagenUrl: "https://gmedia.playstation.com/is/image/SIEPDC/final-fantasy-7-rebirth-keyart-01-en-01sep23?$1600px$",
    },
    // Juegos de Xbox
    {
      id: 7,
      nombre: "Starfield",
      tipo: "juego",
      precio: 280000,
      cantidad: 18,
      imagenUrl: "https://news.xbox.com/es-latam/wp-content/uploads/sites/4/StarfieldShowcase_HERO-e36b02f4bced8d4fb72b.jpg",
    },
    {
      id: 8,
      nombre: "Halo Infinite",
      tipo: "juego",
      precio: 240000,
      cantidad: 35,
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWEggPtWcpFM0YDlKxq14CnDt1GdkuT2FzpA&s",
    },
    {
      id: 9,
      nombre: "Forza Horizon 5",
      tipo: "juego",
      precio: 240000,
      cantidad: 40,
      imagenUrl: "https://i0.wp.com/simracer.es/app/uploads/2021/08/Forza_gamescom_HERO-1.webp?fit=1280%2C720&ssl=1",
    },
    // Juegos de Nintendo Switch
    {
      id: 10,
      nombre: "The Legend of Zelda: Tears of the Kingdom",
      tipo: "juego",
      precio: 290000,
      cantidad: 50,
      imagenUrl: "https://cdn.rudo.video/upload/us/ecuavisa/1100107/64ec9530a690a_1100107.jpg",
    },
    {
      id: 11,
      nombre: "Super Mario Bros. Wonder",
      tipo: "juego",
      precio: 250000,
      cantidad: 45,
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNF5NRYA8f7ZOqs8MAuRu2rm_6SJDbewfeoA&s",
    },
    {
      id: 12,
      nombre: "Pokémon Escarlata",
      tipo: "juego",
      precio: 250000,
      cantidad: 38,
      imagenUrl: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_PokemonScarletViolet_Scarlet_esES_image1600w.jpg",
    },
  ];

  await db.collection("productos").insertMany(productos);
  console.log("✅ Catálogo de productos insertado con éxito.");

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