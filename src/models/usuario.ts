// Schema Usuario con Mongoose
import { Schema, model } from 'mongoose';
// Interfaces Usuario
import { UsuarioInterface } from '../types/interfaces';

// Usamos genericos new Schema<UsuarioInterface>, para decirle al Schema que queremos definir la estructura de los datos en un esquema de Bases de Datos
const usuarioSchema = new Schema<UsuarioInterface>({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    google: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['SUPER_ADMIN_ROLE','ADMIN_ROL', 'VENTAS_ROL']
    },
    estado: {
        type: Boolean,
        defualt: true
    }
});
// QUITAR __V Y EL PASSWORD DE LA RESPUESTA
usuarioSchema.methods.toJSON = function(): UsuarioInterface { 
    // Desestructuramos lo que no queremos que aparezca 
    const {password, __v, ...usuario} = this.toObject();

    // Para ver mas: https://chatgpt.com/c/672a9a2b-9408-8002-88e7-506cb5847136
    // Creamos un nuevo objeto para devolver y evitamos modificar el original
    // Object.assign es un método de JavaScript que se utiliza para copiar las propiedades de uno o más objetos de origen a un objeto destino. El objetivo principal de Object.assign es combinar objetos o hacer copias superficiales de ellos, útil para clonar objetos y evitar la mutación de los originales.
    const usuarioFiltrado: UsuarioInterface = Object.assign({}, usuario);
    // Retornamos le nuevo objeto sin password ni __v
    return usuarioFiltrado;

}

// exports
export = model<UsuarioInterface>('Usuario', usuarioSchema)
