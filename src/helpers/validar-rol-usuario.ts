// Schema Roles
import Roles from "../models/roles";

// validar el rol del usuario
const esRolValido = async ( rol: string = ''): Promise<void> => {
    // traer los ROLES desde al BD
    const existeRol = await Roles.findOne({ rol });
    // console.log(typeof roles, "roles usuario");
    if ( !existeRol ) {
        // lanzamos el error
        throw new Error(`El ROL: ${ rol } no existe en la BD: {SUPER_ADMIN_ROLE, ADMIN_ROL, VENTAS_ROL}`);
    }
}
// exports
export {
    esRolValido
}