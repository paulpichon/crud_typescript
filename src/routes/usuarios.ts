// Router express
const { Router } = require("express");
// renombrar la funcion
const router = Router();
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
router.post('/', usuariosPost);
// PUT
router.put('/', usuariosPut);
// DELETE
router.delete('/', usuariosDelete);


// exports
module.exports = router;