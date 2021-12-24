class ItemCarrito {
    constructor (cantidad, producto) {
        this.cantidad = parseInt(cantidad);
        this.producto = producto;
    }

    agregarCantidad = (numero) => {
        this.cantidad += numero;
    }
}