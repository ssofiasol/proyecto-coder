
let jsonCarrito;
let carrito = new Carrito();

function agregarDivItemCarrito(nombre, precio) {
    let itemDelCarrito =  $('<div/>').addClass("estilosCarrito").text(`${nombre} $${precio}`)
    const divCarrito = $("#carrito")[0]
    divCarrito.prepend(itemDelCarrito[0], divCarrito.firstChild);
}

if (localStorage.getItem('carrito')) {
    jsonCarrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    jsonCarrito = carritoInicial
}

for (let index = 0; index < jsonCarrito.items.length; index++) {
    const element = jsonCarrito.items[index];
    const producto = new Producto(element.producto.nombre, parseInt(element.producto.precio), 0)
    carrito.agregarItem(new ItemCarrito(element.cantidad, producto))
    agregarDivItemCarrito(producto.nombre, producto.precio)
}
document.getElementById("totalCompra").innerText = `Total: $${carrito.calcularTotal()}`

let botonesDanger = document.getElementsByClassName("btn-danger");

for (let index = 0; index < botonesDanger.length; index++) {
    const element = botonesDanger[index];
    element.onclick = () => {
        const nombreProducto = element.parentNode.parentNode.querySelector('.card-title').innerText;
        const precioProducto = element.parentNode.parentNode.querySelector('.card-text').innerText.replace('$', '');
        const producto = new Producto(nombreProducto, parseInt(precioProducto), 0)
        carrito.agregarItem(new ItemCarrito(1, producto))
        element.innerText = "Agregar más";
        agregarDivItemCarrito(producto.nombre, producto.precio);
        $("#totalCompra").text(`Total: $${carrito.calcularTotal()}`)
        localStorage.setItem('carrito', JSON.stringify(carrito));
        agregarCuadroDesplegable(producto.nombre, producto.precio);
    }
}

function agregarCuadroDesplegable(nombre, precio) {
    $('#textoDeNotificacion').text(`Agregaste: ${nombre} $${precio}`)
    
    $('#cartelDeNotificacion')
    .css("display", "flex")
    .hide()
    .fadeIn(1000, function () {
        $('#cartelDeNotificacion').fadeOut(3000);
    })    
}

$('#logoCarrito').click(() => {
    const carrito = $('#carrito')
        if (carrito.hasClass("desplegado")) {
            carrito.removeClass("desplegado")
        } else {
            carrito.addClass("desplegado")
        }
});

let botones = document.getElementsByClassName("btn");

for (let index = 0; index < botones.length; index++) {
    const element = botones[index];
    element.onfocus = () => {
        element.classList.add("btn-focused")
    }
    element.onblur = () => {
        element.classList.remove("btn-focused")
    }
}
