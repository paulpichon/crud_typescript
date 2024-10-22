// Router express
const { Router } = require("express");
// renombrar la funcion
const router = Router();
// Express validator
import { check } from "express-validator";
//helpers 
import { validarCampos } from "../helpers/validar-campos";
// 
import { 
        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete
    } from "../controllers/usuarios";

// GET
router.get('/', usuariosGet);
// POST
router.post('/', [
    // Validar el nombre, no este vacio y sea string
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    // Validar los campos
    validarCampos,
], usuariosPost);
// PUT
router.put('/', usuariosPut);
// DELETE
router.delete('/', usuariosDelete);


// exports
module.exports = router;