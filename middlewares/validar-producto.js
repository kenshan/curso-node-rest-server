

const existeProducto = async(req, res, next) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    if (!producto) {
        return res.status(404).json({
            ok: false,
            msg: 'La Producto no existe'
        });
    }
    req.producto = producto;
    next();

}