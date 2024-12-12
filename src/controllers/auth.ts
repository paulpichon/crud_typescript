// express
import { Request, Response } from "express";
// Bcryptjs
import bcryptjs from "bcryptjs";
// Interface
import { UsuarioInterface, RolesUsuario } from "../types/interfaces";
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
        // desestructuramos de id_token
        const { nombre, correo, img } = await verify( id_token );
        // verificar el usuario
        let usuario = await Usuario.findOne({ correo });
        
        // validar la existencia del usuario en la BD
        if ( !usuario ) {
            // creamos la data del usuario
            // Usamos UsuarioInterface para que los datos coincidan con nuestra interface
            const data: UsuarioInterface  = {
                nombre,
                correo,
                password: ':p',
                rol: 'ADMIN_ROLE',
                img,
                google: true
            }
            // creamos el usuario
            usuario = new Usuario( data );
            // guardalo en la BD
            await usuario.save();
        }
        // en caso de que el usuario este ya registrado en la BD, pero no pueda iniciar sesion
        // mostramos un mensaje, ya que podria estar bloqueado el usuario
        if ( !usuario.estado ) {
            return res.json({
                msg: 'Hable con un administrador, usuario bloqueado',
            });
        }
        // generar el JWT
        // Uso de _id: Siempre asegúrate de verificar que _id no sea UNDEFINED antes de usarlo. Si estás seguro de que siempre tendrá valor, usa ! como se muestra.
        const token = await generarJWT(usuario._id); // Usa `!` porque _id no será undefined aquí.

        // Respuesta
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log( error );
        
        res.status(400).json({
            msg: 'Token de google no es valido'
        });
    }
}

export {
    login,
    googleSingIn
}