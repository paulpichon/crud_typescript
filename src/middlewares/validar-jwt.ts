//Express 
import { NextFunction, Request, Response } from "express";
// jsonwebtoken
import jwt from 'jsonwebtoken';

// validar el JWT para que puedan borrar registros
const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtener el token
        const token = req.header('x-token') as string;  
        // validar si hay token
        if (!token) {
            return res.status(404).json({
                msg:'No hay token en la peticion'
            });
        }
        // validamos el token
        const uuid = jwt.verify(token, process.env.PRIVATEORPUBLICKEY as string, 
            function(err, decoded) {
                
                // si el token expiro
                if (err) {
                    return res.status(500).json({
                        msg: 'El token expiro'
                    });
                }
                // desestructurar el decoded
                const { uuid, exp } = decoded as jwt.JwtPayload;
                console.log(uuid, 'USER ID');
                console.log(exp, 'exp');
                
            });
        // siguiente middleware
        next();
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
     