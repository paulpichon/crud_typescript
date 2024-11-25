//Express 
import { NextFunction, Request, Response } from "express";
// jsonwebtoken
import jwt from 'jsonwebtoken';
// Usuario modelo
import Usuario from "../models/usuario";

// validar el JWT para que puedan borrar registros
const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    // obtener el token
    const token = req.header('x-token') as string;  
    // validar si hay token
    if (!token) {
        return res.status(404).json({
            msg:'No hay token en la peticion'
        });
    }
    try {
        // validamos el token
        const uuid = jwt.verify(token, process.env.PRIVATEORPUBLICKEY as string, 
            async function(err, decoded) {
                
                // si el token expiro
                if (err) {
                    return res.status(500).json({
                        msg: 'El token expiro'
                    });
                }
                // desestructurar el decoded
                const { uuid } = decoded as jwt.JwtPayload;
                // validar que el UUID exista en la BD
                const usuario = await Usuario.findById( uuid );
                if (!usuario) {
                    return res.status(404).json({
                        msg: 'Token no valido - El usuario no existe en la BD'
                    });    
                }
                // validar que el estado del usuario sea true
                if ( !usuario.estado) {
                    return res.status(404).json({
                        msg: 'Token invalido - estatus:false'
                    });
                }
                // creamos una propiedad nueva usuario en el request
                // Se crea una propieda nueva en el Request.Express para poder usar req.usuario
                // Explicacion del codigo de abajo: https://chatgpt.com/c/673e3cd1-cca8-8002-8e06-e1bd6968db4d
                req.usuario = usuario;
                // siguiente middleware
                next();
            }); 
            
    } catch (error) {
        // console.log( error );
        return res.status(500).json({ 
            msg: 'Hubo un error al verificar el TOKEN, contactar a soporte'
        });
    }
}
// exports
export {
    validarJWT
}
     