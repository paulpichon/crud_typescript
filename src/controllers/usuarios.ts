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
const usuariosGet = async (req: Request<UsuarioInterface>, res: Response): Promise<Response> => {
    // params
    // const { limite = 5, desde = 0 } = req.query;
    // EXPLICACION
    // Explicación
    // parseInt(req.query.limite as string, 10): Convierte el valor de limite a un número entero en base decimal. Usamos el operador as string para que TypeScript trate req.query.limite como un string, ya que req.query tiene valores de tipo string | undefined.
    // || 5: Define un valor por defecto en caso de que el valor en req.query.limite sea undefined o no pueda convertirse a un número.
    // https://chatgpt.com/c/6733bb2e-19bc-8002-919d-e6cd812be660
    const limite: number = parseInt( req.query.limite as string, 10) || 5;
    // DESDE
    const desde: number = parseInt( req.query.desde as string) || 0;
    // tipado por inferencia
    const query = { estado: true };
    // traer los registros
    // Promise.ALL
    // Revise los tipos de datos devuelto: total y usuarios con typeof, : [number, object]
    // :[string, number] ---> https://chatgpt.com/c/6733bb2e-19bc-8002-919d-e6cd812be660
    // https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
    // tuple type: [number, object]
    const [total, usuarios]: [number, object] = await Promise.all([
      Usuario.countDocuments( query ),
      Usuario.find( query )
      .skip( desde )
      .limit( limite )
    ]);

    // Respuesta
    return res.json({
      total,
      usuarios
    })
}
// POST
const usuariosPost = async (req: Request<UsuarioInterface>, res: Response): Promise<Response> => {
    try { 
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
      return res.json(usuario);

    } catch (error) {
        console.error( error );
        return res.status( 500 ).json({
          msg: 'No se pudo crear el usuario'
        });      
    }
}
// PUT
const usuariosPut = async (req: Request<RequestParamsId>, res: Response): Promise<Response> => {
  try {
    
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
    // verificar si el usuario existe
    //  Antes de devolver la respuesta, se verifica si el usuario existe. Esto evita devolver un null si el usuario no se encontró.
    if ( !usuario ) {
      return res.status(404).json({ 
        msg: 'El usuario no existe'
      });
    }
    //respuesta 
    return res.json( usuario);

  } catch (error) {
    // Manejo de errores
    console.error( error );
    return res.status( 500 ).json({
      msg: 'No se pudo actualizar el usuario'
    });
    
  }
}
// DELETE
// El tipo de retorno se especifica como Promise<Response>, lo cual proporciona mayor claridad.
const usuariosDelete = async (req: Request<RequestParamsId>, res: Response): Promise<Response> => {
    try {
      // obtener el ID del usuario
      const { id } = req.params;
      // buscar el usuario y eliminarlo
      // en lugar de eliminar fisicamente el registro solo le cambiamos el estatus = 0
      const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {
        new: true
      });

      // Verificar si el usuario existe
      //  Antes de devolver la respuesta, se verifica si el usuario existe. Esto evita devolver un null si el usuario no se encontró.
      if (!usuario) {
        return res.status(404).json({ 
          msg: 'Usuario no encontrado' 
        });
      }
      // usuario autenticado
      const usuarioAutenticado = req.usuario;
            
      //respuesta con el usuario eliminado
      return res.json({
        usuario,
        usuarioAutenticado
      });

    } catch (error) {
      // Manejo de errores  
      console.error( error ); 
      return res.status(500).json({
        msg: 'Error al eliminar el usuario'
      });
    }
}
export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}