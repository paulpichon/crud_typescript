// Interfaces 
// importamos mongoose
import mongoose from "mongoose";

// interface Usuario
interface UsuarioInterface {
    _id?: mongoose.Schema.Types.ObjectId, 
    nombre: string;
    apellidos?: string;
    correo: string;
    password: string;
    google?: boolean;
    img?: string;
    // En TypeScript, esto se denomina string union type.
    // Significa que la propiedad "rol" sólo puede ser uno de los 2 string: 'ADMIN_ROL' o 'VENTAS_ROL'.
    rol: 'SUPER_ADMIN_ROLE' | 'ADMIN_ROL' | 'VENTAS_ROL';
    estado?: boolean;
}
// Request
// Agregar una propiedad nueva al Request de Express
// Esto es parte poara validacion del token
// Explicacion del codigo de abajo: https://chatgpt.com/c/673e3cd1-cca8-8002-8e06-e1bd6968db4d
// No hace falta exportarlo ya que con "global" se hace referencia que se puede usar donde sea dentro del proyecto
declare global {
    namespace Express {
      interface Request {
        usuario?: UsuarioInterface; // Agregas tu propiedad personalizada, se pone opocional ya que no siempre podria venir
      }
    }
}
// Interface de Roles
interface RolesUsuario {
    rol: 'SUPER_ADMIN_ROLE' | 'ADMIN_ROL' | 'VENTAS_ROL';
}
// Interface de id: este id es el que viene de las rutas PUT y DELETE
interface RequestParamsId {
    id: string;
}

// Exports
export {
    UsuarioInterface,
    RolesUsuario,
    RequestParamsId
}