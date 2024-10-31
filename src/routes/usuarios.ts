// Router express
const { Router } = require("express");
// renombrar la funcion
const router = Router();
// Express validator
import { check } from "express-validator";
// 
import { 
        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete
    } from "../controllers/usuarios";
// validar correo de usuario 
import { validarCorreo } from "../helpers/validar-correo-usuario";
//helpers 
import { validarCampos } from "../helpers/validar-campos";
// Validar un rol de usuario vs la BD
import { esRolValido } from "../helpers/validar-rol-usuario";

// GET
router.get('/', usuariosGet);
// POST
router.post('/', [
    // Validar el nombre, no este vacio y sea string
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    // validar el correo
    check('correo', 'El email no es valido').normalizeEmail().isEmail(),
    // que sea unico, que sea un correo valido
    check('correo').custom( validarCorreo ),
    // validar el password
    check('password', 'El password es obligatorio: {min: 6 caracteres}').trim().notEmpty().isLength({ min: 6 }),
    // validar el rol del usuario
    // check('rol', 'El rol no es valido: {ADMIN_ROL, VENTAS_ROL}').isIn(['ADMIN_ROL', 'VENTAS_ROL']),
    // verificar el ROL desde una ase e datos
    check('rol').custom( esRolValido ),

    // Validar los campos
    validarCampos,
], usuariosPost);
// PUT
router.put('/:id', usuariosPut);
// DELETE
router.delete('/:id', usuariosDelete);


// exports
module.exports = router;