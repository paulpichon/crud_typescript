// Interfaces 
// interface Usuario
interface UsuarioInterface {
    nombre: string;
    apellidos?: string;
    correo: string;
    password: string;
    google?: boolean;
    img?: string;
    // En TypeScript, esto se denomina string union type.
    // Significa que la propiedad "rol" sólo puede ser uno de los 2 string: 'pendiente' o 'pagado'.
    rol: 'ADMIN_ROL' | 'VENTAS_ROL';
    estado?: boolean;
}

// Exports
export {
    UsuarioInterface
}