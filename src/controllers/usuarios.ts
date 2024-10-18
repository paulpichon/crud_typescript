// imporatmos Usuario schema
import Usuario from "../models/usuario";
// Request, Response
// Se debe importar request, reponse de @types/express
//para que req.body sea reconocido
import { request, response } from "express";
// Interface de Usuario
import { UsuarioInterface } from "../types/interfaces";


// GET
const usuariosGet = (req = request, res = response) => {
    res.json({
      msg: 'Get - API'
    })
}
// POST
const usuariosPost = async (req = request, res = response) => {
    //Obtener los datos del body
    // Utilizamos UsuarioInterface para decirle al objeto que debe tener esos types
    // se usa para asegurarse de que un objeto en tiempo de ejecución cumpla con esa estructura.
    const {nombre, correo, password, rol}: UsuarioInterface = req.body;
  
    // crear un usuario
    const usuario = new Usuario<UsuarioInterface>({nombre, correo, password, rol});
    // guardar en la BD
    await usuario.save();
    // respuesta
    res.json(usuario)
}
// PUT
const usuariosPut = (req = Request, res = Response) => {
    res.json({
      msg: 'PUT - API'
    })
}
// DELETE
const usuariosDelete = (req = Request, res = Response) => {
    res.json({
      msg: 'DELETE - API'
    })
}


export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}