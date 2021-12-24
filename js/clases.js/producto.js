class Producto {
    constructor (nombre, precio, porcentageDescuento = 0) {
        this.nombre = nombre;        
        this.precio = parseInt(precio);
        this.porcentageDescuento = porcentageDescuento;
    }
}

