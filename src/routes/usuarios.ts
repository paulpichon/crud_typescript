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
// Validar el ID del usuario exxista en la BD
import { existeIdUsuario } from "../helpers/validar-id-usuario";

// GET
router.get('/', usuariosGet);
// POST
router.post('/', [
    // Validar el nombre, no este vacio y sea string
    check('nombre', 'El nombre es obligatorio').trim().notEmpty().escape(),
    // validar el correo
    check('correo', 'El email no es valido').trim().normalizeEmail().isEmail(),
    // que sea unico, que sea un correo valido
    check('correo').custom( validarCorreo ),
    // validar el password
    check('password', 'El password es obligatorio: {min: 6 caracteres}').trim().notEmpty().isLength({ min: 6 }),
    // validar el rol del usuario
    // check('rol', 'El rol no es valido: {ADMIN_ROL, VENTAS_ROL}').isIn(['ADMIN_ROL', 'VENTAS_ROL']),
    // verificar el ROL desde una ase e datos
    check('rol').custom( esRolValido ).trim().notEmpty(),
    // Validar los campos
    validarCampos,
], usuariosPost);
// PUT
router.put('/:id', [
    // validr el ID
    check('id', 'El ID no es valido').isMongoId(),
    // validar que el ID de usuario exista en la BD
    check('id').custom( existeIdUsuario ),
    // Validar el nombre, no este vacio y sea string
    check('nombre', 'El nombre es obligatorio').optional().trim().notEmpty().escape(),
    // Validar apellidos, no este vacio y sea string
    check('apellidos', 'Los apellidos deben tene minimo: 2 caracteres').optional().trim().notEmpty().escape(),
    // validar el password
    check('password', 'El password es obligatorio: {min: 6 caracteres}').optional().trim().notEmpty().isLength({ min: 6 }),
    // Validar img, no este vacio y sea string
    check('img', 'La  img debe ser un string').optional().trim().notEmpty(),
    // validar el rol del usuario
    // check('rol', 'El rol no es valido: {ADMIN_ROL, VENTAS_ROL}').isIn(['ADMIN_ROL', 'VENTAS_ROL']),
    // verificar el ROL desde una ase e datos
    check('rol').custom( esRolValido ).optional().trim().notEmpty(),
    // Validar estado
    // true | false no pueden ser strings
    check('estado', 'El estado debe ser true or false').optional().trim().notEmpty().isBoolean(),
    // Validar los campos
    validarCampos,
], usuariosPut);
// DELETE
router.delete('/:id', usuariosDelete);


// exports
module.exports = router;