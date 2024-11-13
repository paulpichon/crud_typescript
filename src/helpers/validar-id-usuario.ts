// funcion para validar la existencia de un usuario por ID

// modelo usuario
import Usuario from "../models/usuario"

const existeIdUsuario = async ( id = ''): Promise<void> => {
    // buscar el usuario
    const usuarioIdExiste = await Usuario.findById( id );
    // si NO existe, mostramos una alerta
    if ( !usuarioIdExiste ) {
        throw new Error(`El ID: ${id} no existe en la BD`);
    }
}

export {
    existeIdUsuario
}