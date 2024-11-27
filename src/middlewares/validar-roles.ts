
// Express
import { NextFunction, Request, Response } from "express";
// Role modelo
import Role from "../models/roles";

// Funcion para validar los roles de usuario autenticado
const esAdminRol = (req: Request, res: Response, next: NextFunction): Response | void => {
    // validar que exista req.usuario
    if (!req.usuario) {
        return res.status(500).json({ 
            msg: 'Se quiere validar el ROL sin validar el TOKEN primero.'
        });
    }
    // obtener roles de request
    const {rol, nombre} = req.usuario;
    // validar que el rol sea igual a SUPER_ADMIN_ROLE
    if ( rol !== 'SUPER_ADMIN_ROLE') {
        // 403 Forbidden
        return res.status(403).json({
            msg: `El usuario: ${ nombre } y rol: ${rol} no tiene permisos para esta operacion: solo el ROL SUPER_ADMIN_ROLE puede hacerlo`
        });
    }
    // siguiente middleware o funcion
    next();
}
// Funcion para validar varios Roles al mismo tiempo
const validarRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.usuario!.rol);
        // Si no existe req.usuario
        if (!req.usuario) {
            return res.status(500).json({ 
                msg: 'Se quiere validar el ROL sin validar el TOKEN primero.'
            });
        }
        // Validar el rol del usuario autenticado
        if (!roles.includes(req.usuario!.rol)) {
            // obtener roles de request
            const {rol, nombre} = req.usuario;
            return res.status(403).json({
                msg: `El usuario: ${ nombre } y rol: ${rol} no tiene permisos para esta operacion: solo el ROL SUPER_ADMIN_ROLE puede hacerlo`
            });
        }
        
        

        // pasar a la siguiente funcion/middleware
        next();
    }
}
// exports
export {
    esAdminRol,
    validarRoles
}