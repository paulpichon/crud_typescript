// Router express
const { Router } = require("express");
// renombrar la funcion
const router = Router();
// expree validator
import { check } from "express-validator";
// login
// googleSignIn
import { googleSingIn, login } from "../controllers/auth";
// express validator
import { validarCampos } from "../middlewares/validar-campos";

// POST
router.post('/login', [
    // Validar correo - no este vacio
    check('correo', 'El correo es obligatorio').trim().notEmpty().escape(),
    // Validar correo
    check('correo', 'El correo es invalido').isEmail(),
    // validar password
    check('password', 'El password es obligatorio').notEmpty(),
    // Validar los campos
    validarCampos,
], login);
// GoogleSignIn
router.post('/google-sign-in', googleSingIn);

// exports
module.exports = router;