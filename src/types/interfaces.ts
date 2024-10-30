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
    // Significa que la propiedad "rol" sólo puede ser uno de los 2 string: 'ADMIN_ROL' o 'VENTAS_ROL'.
    rol: 'SUPER_ADMIN_ROLE' | 'ADMIN_ROL' | 'VENTAS_ROL';
    estado?: boolean;
}
// Interface de Roles
interface RolesUsuario {
    rol: 'SUPER_ADMIN_ROLE' | 'ADMIN_ROL' | 'VENTAS_ROL';
}

// Exports
export {
    UsuarioInterface,
    RolesUsuario
}