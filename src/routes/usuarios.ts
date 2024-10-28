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

// GET
router.get('/', usuariosGet);
// POST
router.post('/', [
    // Validar el nombre, no este vacio y sea string
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    // validar el correo
    check('correo', 'El email no es valido').normalizeEmail().isEmail(),
    // que sea unico, que sea un correo valido
    check('correo').custom( validarCorreo ),
    // validar el password
    check('password', 'El password es obligatorio: {min: 6 caracteres}').trim().notEmpty().isLength({ min: 6 }),
    // Validar los campos
    validarCampos,
], usuariosPost);
// PUT
router.put('/', usuariosPut);
// DELETE
router.delete('/', usuariosDelete);


// exports
module.exports = router;