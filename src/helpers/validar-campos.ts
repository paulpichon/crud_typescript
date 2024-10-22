// express
import { NextFunction, Request, Response } from 'express';
// Express validator
import { validationResult } from 'express-validator';
// Funcion para validar los campos
const validarCampos = ( req: Request, res: Response, next: NextFunction ) => {
    // obtenemos los errores
    const errores = validationResult(req);
    // verificar si hay errores
    if( !errores.isEmpty() ) {
        // si no esta vacio errores, los mostramos
        return res.status(404).json({ errores });
    }
    // si no hay errores, pasamos a la siguiente funcion
    next();
}
// exports
export {
    validarCampos
}