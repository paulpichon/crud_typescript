// Importamos intarface Usuario
import { UsuarioInterface } from "../types/interfaces"
// Schema Usuario
import Usuario from "../models/usuario"

// funcion para validar le correo del usuario
const validarCorreo = async ( correo: string = '' ): Promise<void> =>  {
    // verififcar si hay coincidencia de correos
    const existeCorreo = await Usuario.findOne({ correo });
    // si hay coincidencias moatramos los errores
    if ( existeCorreo ) {
        // mostramos error
        throw new Error(`El correo: ${ correo }  ya existe en la base de datos`);
    }
}
// exports
export {
    validarCorreo
}