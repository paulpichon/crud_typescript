import { Request, Response } from "express"

// POST
const login = ( req: Request, res: Response) => {

    // respuesta
    res.json({
        msg: 'Authentication'
    });
}


export {
    login
}