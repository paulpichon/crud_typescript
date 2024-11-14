// express
import { Request, Response } from "express";
// Bcryptjs
import bcryptjs from "bcryptjs";
// Interface
import { UsuarioInterface } from "../types/interfaces";
// Usuario model
import Usuario from "../models/usuario";

// POST
const login = async ( req: Request<UsuarioInterface>, res: Response) => {
    // obtener el body
    // se define que req.body es de tipo UsuarioInterface, y luego se desestructura las propiedades
    const { correo, password } = req.body as UsuarioInterface;
    try {
        // validar que el correo exista en la BD
        const usuario = await Usuario.findOne({ correo }) as UsuarioInterface;
        // si no existe
        if (!usuario) {
            return res.status(404).json({
                msg: `Correo/password incorrectos: correo no existe en la BD`
            });
        }
        // validar que el estado del usuario este activo
        if (!usuario.estado) {
            return res.status(404).json({
                msg: `Correo/password incorrectos: estado:false`
            });
        }
        // validar que la contraseña sea correcta
        // Load hash from your password DB.
        const verificarPass = bcryptjs.compareSync(password, usuario.password); 
        // si es false
        if ( !verificarPass ) {
            return res.status(404).json({
                msg: `Correo/password incorrectos: password incorrecto`
            });
        }
        // generar el JWT

        // respuesta
        return res.json({
            correo, password
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al procesar la solicitud'
        });
    }
}


export {
    login
}