// conexion a la BD Mongoose
// mongoose
import mongoose from 'mongoose';

const conexionBD = async () => {
    // URI
    // Aserciones de tipo
    // Tratamos la const uri con un string, ya que TYPESCRIPT interpreta esta variable como string | undefined, por lo cual le decimos que nosotros queremos que lo tyrate como un string: para mas informacion
    // https://www.notion.so/Afirmaciones-de-tipo-11a9c588c8e0804ebdf0d7d16d4235df
    const uri: string = (process.env.MONGODB_URI as string);
    console.log(`La BD esta en linea.`);
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error(`Hubo un error al hacer la conexion a la BD: ${ error }`);
        // throw new Error(`Hubo un error al iniciar la BD, contactar a soporte`);
    }
}
// exports
export {
    conexionBD
}