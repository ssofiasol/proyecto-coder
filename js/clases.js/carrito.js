class Carrito {
    constructor() {
        this.items=[];
    }

    agregarItem = (item) => {
        let itemEncontrado = this.items.find(i => item.producto.nombre === i.producto.nombre);
        if (itemEncontrado) {
            itemEncontrado.agregarCantidad(item.cantidad);
        }
        else {
            this.items.push(item);
        }
    }

    agregarCantidadAItemPorNombre = (nombre, cantidad) => {
        let itemEncontrado = this.items.find(i => i.producto.nombre === nombre);
        
        itemEncontrado.agregarCantidad(cantidad);
        
        if (itemEncontrado.cantidad <= 0){
            this.eliminarItemPorNombre(nombre)
        }
    }

    eliminarItemPorNombre = (nombre) => {
        this.items = this.items.filter(i => i.producto.nombre !== nombre)
    }

    calcularTotal = () => {
        let total = 0;
        for (const item of this.items) {
            total +=  item.cantidad * item.producto.precio * (100 - item.producto.porcentageDescuento) / 100;
        }

        return total
    }

    conseguirItem = (item) => {
        return this.items.find(i => item.producto.nombre === i.producto.nombre);
    }

    conseguirItemPorNombre = (nombre) => {
        return this.items.find(i => nombre === i.producto.nombre);
    }
}