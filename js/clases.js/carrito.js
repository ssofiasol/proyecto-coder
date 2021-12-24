class Carrito {
    constructor() {
        this.items=[];
    }

    agregarItem = (item) => {
        let itemEncontrado = this.items.find(i => item.producto === i.producto);
        if (itemEncontrado) {
            itemEncontrado.agregarCantidad(item.cantidad);
        }
        else {
            this.items.push(item);
        }
        
    }

    calcularTotal = () => {
        let total = 0;
        for (const item of this.items) {
            total +=  item.cantidad * item.producto.precio * (100 - item.producto.porcentageDescuento) / 100;
        }

        return total
    }
}