import { obtenerBD } from '../config/db.js';

const COLECCION_USUARIOS = 'usuarios';

export async function registrarUsuario(datos) {
    const { nombre, email, password } = datos;
    if (!nombre || !email || !password) {
        throw new Error('Todos los campos son obligatorios.');
    }
    
    const db = obtenerBD();
    const coleccion = db.collection(COLECCION_USUARIOS);
    const usuarioExistente = await coleccion.findOne({ email });
    if (usuarioExistente) {
        throw new Error('El correo ya está registrado.');
    }

    // 1. Busca el usuario con el ID más alto.
    const ultimoUsuario = await coleccion.find().sort({ id: -1 }).limit(1).toArray();
    // 2. Calcula el nuevo ID. Si no hay usuarios, empieza en 1.
    const nuevoId = ultimoUsuario.length > 0 ? ultimoUsuario[0].id + 1 : 1;

    
    const nuevoUsuario = { 
        id: nuevoId, 
        nombre, 
        email, 
        password,
        rol: 'cliente'
    };
    await coleccion.insertOne(nuevoUsuario);
    
    return { message: 'Usuario registrado exitosamente.' };
}

export async function loginUsuario(credenciales) {
    const { email, password } = credenciales;
    if (!email || !password) {
        throw new Error('Correo y contraseña son requeridos.');
    }
    
    const db = obtenerBD();
    const usuario = await db.collection(COLECCION_USUARIOS).findOne({ email, password });
    
    if (!usuario) {
        throw new Error('Credenciales inválidas.');
    }
    
    // Devolvemos el usuario completo menos la contraseña y el _id de Mongo
    const { password: _, _id, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
}