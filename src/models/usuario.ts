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

// exports
export = model<UsuarioInterface>('Usuario', usuarioSchema)
