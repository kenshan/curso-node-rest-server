

const existeCategoria = async(req, res, next) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    if (!categoria) {
        return res.status(404).json({
            ok: false,
            msg: 'La categoria no existe'
        });
    }
    req.categoria = categoria;
    next();

}