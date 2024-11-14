// Router express
const { Router } = require("express");
// renombrar la funcion
const router = Router();
// expree validator
import { check } from "express-validator";
// login
import { login } from "../controllers/auth";
// express validator
import { validarCampos } from "../helpers/validar-campos";

// POST
router.post('/login', [
    // Validar correo
    check('correo', 'El correo es obligatorio').trim().notEmpty().escape().isEmail(),
    // validar password
    check('password', 'El password es obligatorio').notEmpty(),
    // Validar los campos
    validarCampos,
], login);

// exports
module.exports = router;