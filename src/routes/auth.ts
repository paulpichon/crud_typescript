// Router express
const { Router } = require("express");
// renombrar la funcion
const router = Router();
// login
import { login } from "../controllers/auth";

// POST
router.post('/login', login);

// exports
module.exports = router;