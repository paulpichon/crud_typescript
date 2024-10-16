// importamos mongodb
import { MongoClient } from "mongodb";

// conexion a la BD
const dbConnection = async () => {
    // Replace the uri string with your connection string.
    // Type Assertion para saber mas: https://www.notion.so/Afirmaciones-de-tipo-11a9c588c8e0804ebdf0d7d16d4235df
    // https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
    const uri= (process.env.MONGODB_URI as string);
    const client = new MongoClient(uri);
    try {
        // Conectar al servidor de MongoDB
        await client.connect();
        console.log('La BD esta en linea');
        
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }


    
    // async function run() {
    //     
    // }
    // run().catch(console.dir);
}
// exports
export {
    dbConnection
}