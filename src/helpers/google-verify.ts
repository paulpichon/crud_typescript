// Validar el token de google
// Google Verify

const {OAuth2Client} = require('google-auth-library');

// const client = new OAuth2Client();
const client = new OAuth2Client( process.env.CLIENTE_ID_GOOGLE );

 const verify = async ( token: string = '' ) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENTE_ID_GOOGLE as string,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, email, picture } = ticket.getPayload();

  return { 
    nombre: name, 
    correo: email, 
    img: picture
  }
  
}

export {
    verify
}