// Mongoose
import { Schema, model } from "mongoose";
// Interface de Roles
import { RolesUsuario } from "../types/interfaces";

// Schema de ROLES de usuario
// <RolesUsuario>: Interface
const rolesUsuario = new Schema<RolesUsuario>({
    rol: {
        type: String,
        required: [true, 'El ROL del usuario es obligatorio']
    }
});
// export
 export = model('Role', rolesUsuario)