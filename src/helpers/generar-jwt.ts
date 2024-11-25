// Se importa Mongoose
import mongoose from "mongoose";
// jsonwebtoken
import jwt from 'jsonwebtoken';

// funcion para generar el JWT
const generarJWT = ( uuid: mongoose.Schema.Types.ObjectId ): Promise<string> => {
    // payload
    const payload = { uuid };
    // crear el TOKEN
    return new Promise( (resolve, reject) => {
        jwt.sign(payload, (process.env.PRIVATEORPUBLICKEY as string), {
            expiresIn: 300 //5 minutos: 1 minuto = 60s
        },
        function(err, token) {
            if ( err ) {
                reject('No se pudo generar el token');
            } else {
                // (token!) y (token as string) no son lo mismo, pero ambos son formas de manejar valores que podrían ser null o undefined en TypeScript, y su propósito principal es indicar al compilador que "confíe" en que el valor no es null o undefined
                // podemos decir que sabemos que token siempre sera string de esta forma token!(Non-null assertion operator)
                //Type Assertions:  o podemos hacerlo asi: token as string
                resolve (token!);
            }
        });
    });
}
// exports
export {
    generarJWT
}