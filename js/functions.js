
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
        let itemDelCarrito =  $('<div/>').addClass("estilosCarrito").text(`${producto.nombre} $${producto.precio}`)
        const divCarrito = $("#carrito")[0]
        divCarrito.prepend(itemDelCarrito[0], divCarrito.firstChild);
        $("#totalCompra").text(`Total: $${carrito.calcularTotal()}`)
    }
}


$('#logoCarrito').click(() => {
    const carrito = $('#carrito')
        if (carrito.hasClass("desplegado")) {
            carrito.removeClass("desplegado")
        } else {
            carrito.addClass("desplegado")
        }
});

