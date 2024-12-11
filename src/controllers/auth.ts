// express
import { Request, Response } from "express";
// Bcryptjs
import bcryptjs from "bcryptjs";
// Interface
import { UsuarioInterface } from "../types/interfaces";
// Usuario model
import Usuario from "../models/usuario";
// Generar el JWT
import { generarJWT } from "../helpers/generar-jwt";
// Google Verify
import { verify } from "../helpers/google-verify";

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
        // Uso de _id: Siempre asegúrate de verificar que _id no sea UNDEFINED antes de usarlo. Si estás seguro de que siempre tendrá valor, usa ! como se muestra.
        const token = await generarJWT(usuario._id!); // Usa `!` porque _id no será undefined aquí.

        // respuesta
        return res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Hubo un error al procesar la solicitud'
        });
    }
}
// Google sign In
const googleSingIn = async (req: Request, res: Response ) => {
    // token
    const { id_token } = req.body as { id_token: string };
    // console.log( typeof id_token);
    

    try {
    
        const googleUser = await verify( id_token );
        console.log( googleUser );
        
        // Respuesta
        res.json({
            msg: 'Google Sign In',
            id_token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo vereficar'
        });
    }
}

export {
    login,
    googleSingIn
}