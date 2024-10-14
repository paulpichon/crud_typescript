
// GET
const usuariosGet = (req = Request, res = Response) => {
    res.json({
      msg: 'Get - API'
    })
}
// POST
const usuariosPost = (req = Request, res = Response) => {
    res.json({
      msg: 'POST - API'
    })
}
// PUT
const usuariosPut = (req = Request, res = Response) => {
    res.json({
      msg: 'PUT - API'
    })
}
// DELETE
const usuariosDelete = (req = Request, res = Response) => {
    res.json({
      msg: 'DELETE - API'
    })
}


export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}