// Express
import { NextFunction, Request, Response } from "express";
// Interface usuario
import { UsuarioInterface } from "../types/interfaces";

// Funcion para validar los roles de usuario autenticado
const validarRoles = (req: Request, res: Response, next: NextFunction) => {
    // validar que exista req.usuario
    if (!req.usuario) {
        return res.status(500).json({ 
            msg: 'Se quiere validar el ROL sin validar el TOKEN primero.'
        });
    }
    // obtener roles de request
    const {rol, nombre} = req.usuario as UsuarioInterface;
    // validar que el rol sea igual a SUPER_ADMIN_ROLE
    if ( rol !== 'SUPER_ADMIN_ROLE') {
        return res.status(404).json({
            msg: `El usuario: ${ nombre } y rol: ${rol} no tiene permisos para esta operacion: solo el ROL SUPER_ADMIN_ROLE puede hacerlo`
        });
    }
    
    
    // siguiente middleware o funcion
    next();
}
// exports
export {
    validarRoles
}