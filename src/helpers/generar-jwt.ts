// Importamos UsuarioInterface
import { UsuarioInterface } from "../types/interfaces"
// Se importa Mongoose
import mongoose from "mongoose";

// funcion para generar el JWT
const generarJWT = async ( uuid: mongoose.Schema.Types.ObjectId ): Promise<string> => {
    


    return "token";
}
// exports
export {
    generarJWT
}