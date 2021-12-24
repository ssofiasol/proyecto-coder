
const carrito = new Carrito();

let botonesDanger = document.getElementsByClassName("btn-danger");

for (let index = 0; index < botonesDanger.length; index++) {
    const element = botonesDanger[index];
    element.onclick = () => {
        const nombreProducto = element.parentNode.parentNode.querySelector('.card-title').innerText;
        const precioProducto = element.parentNode.parentNode.querySelector('.card-text').innerText.replace('$', '');
        const producto = new Producto(nombreProducto, parseInt(precioProducto), 0)
        carrito.agregarItem(new ItemCarrito(1, producto))
        element.innerText = "Agregar más";
        let itemDelCarrito = document.createElement("div");
        itemDelCarrito.classList.add("estilosCarrito");
        let textItemDelCarrito = document.createTextNode(`${producto.nombre} $${producto.precio}`);
        itemDelCarrito.appendChild(textItemDelCarrito);
        const divCarrito = document.getElementById("carrito")
        divCarrito.insertBefore(itemDelCarrito, divCarrito.firstChild);
        document.getElementById("totalCompra").innerText = `Total: $${carrito.calcularTotal()}`
    }
}

logoCarrito.onclick = () => {
    const carrito = document.getElementById("carrito") 
        if (carrito.classList.contains("desplegado")) {
            carrito.classList.remove("desplegado")
        } else {
            carrito.classList.add("desplegado")
        }
    
}

