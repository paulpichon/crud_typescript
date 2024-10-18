// Interfaces 
// interface Usuario
interface UsuarioInterface {
    nombre: string;
    apellidos?: string;
    correo: string;
    password: string;
    google?: boolean;
    img?: string;
    rol: string;
    estado?: boolean;
}

// Exports
export {
    UsuarioInterface
}