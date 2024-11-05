// bcryptjs
import bcryptjs from 'bcryptjs';
// imporatmos Usuario schema
import Usuario from "../models/usuario";
// Request, Response
// Se debe importar request, reponse de @types/express
//para que req.body sea reconocido
import { Request, Response } from "express";
// Interface de Usuario: UsuarioInterface
// Id que viene en la URL de la API: RequestParamsId
import {  RequestParamsId, 
          UsuarioInterface } from "../types/interfaces";

// GET
const usuariosGet = (req: Request, res: Response) => {
    res.json({
      msg: 'Get - API'
    })
}
// POST
const usuariosPost = async (req: Request<UsuarioInterface>, res: Response) => {
    //Obtener los datos del body
    // Utilizamos UsuarioInterface para decirle al objeto que debe tener esos types
    // se usa para asegurarse de que un objeto en tiempo de ejecución cumpla con esa estructura.
    const {nombre, correo, password, rol}: UsuarioInterface = req.body;
    // crear un usuario
    const usuario = new Usuario<UsuarioInterface>({nombre, correo, password, rol});
    // encriptar la contraseña
    const salt: string = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardar en la BD
    await usuario.save();
    // respuesta
    res.json(usuario);
}
// PUT
const usuariosPut = async (req: Request<RequestParamsId>, res: Response) => {
  // obtener el ID del usuario desde la URL
  const { id } = req.params;
  // obtener el body del request
  /*
    Si la interfaz UsuarioInterface ya incluye la propiedad password y aún obtienes un error al intentar agregarla a usuarioRestoDatos, es probable que el problema esté en que TypeScript no reconoce que usuarioRestoDatos tiene la misma estructura que UsuarioInterface después de hacer la desestructuración. Esto ocurre porque la sintaxis de desestructuración crea un nuevo objeto con solo las propiedades restantes (correo, password y _id se extraen y no forman parte de usuarioRestoDatos).
  */ 
  /*
    Solución 1: Hacer un "casting" del tipo de usuarioRestoDatos
    Puedes indicar explícitamente que usuarioRestoDatos tiene el tipo UsuarioInterface usando un "casting" de tipo: as UsuarioInterface
  */  
  const { correo, password, _id, ...usuarioRestoDatos } = req.body as UsuarioInterface;
  // validar si viene la password para cambiarla
  if ( password ) {
    // encriptar la contraseña
    const salt: string = bcryptjs.genSaltSync(10);
    (usuarioRestoDatos as UsuarioInterface).password = bcryptjs.hashSync(password, salt);
  }
  // Actualizar registro
  const usuario = await Usuario.findByIdAndUpdate( id, usuarioRestoDatos, {
    new: true
  });
  //respuesta 
  res.json( usuario);
}
// DELETE
const usuariosDelete = (req: Request<RequestParamsId>, res: Response) => {
    // obtener el ID del usuario
    const { id } = req.params;
    console.log(id);
    

    //respuesta 
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