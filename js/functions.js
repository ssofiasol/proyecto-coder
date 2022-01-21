
let jsonCarrito;
let carrito = new Carrito();

function idProducto(nombre) {
    return nombre.replace(/\s+/g, '-').replace(/\+/g, '-').toLowerCase()
}

function agregarBotonBorrar(nombre, elemento) {
    var botonBorrar = $('<input type="button" value="X" />').addClass("botonBorrar");
    botonBorrar.click({nombre}, (event) => {
        $(`#producto-${idProducto(event.data.nombre)}`).remove()
        carrito.eliminarItemPorNombre(event.data.nombre)
        $("#totalCompra").text(`Total: $${carrito.calcularTotal()}`)
        localStorage.setItem('carrito', JSON.stringify(carrito));
    })
    botonBorrar.appendTo(elemento);
}

function agregarDivItemCarrito(nombre, precio, cantidad) {
    let itemDelCarrito =  $(`<div/>`).attr("id", `producto-${idProducto(nombre)}`).addClass("estilosCarrito").text(`${cantidad} ${nombre} $${precio} c/u`)
    agregarBotonBorrar(nombre, itemDelCarrito);
    const divCarrito = $("#carrito")[0]
    divCarrito.prepend(itemDelCarrito[0], divCarrito.firstChild);
}

function actualizarDivItemCarrito(nombre, precio, cantidad) {
    $(`#producto-${idProducto(nombre)}`).text(`${cantidad} ${nombre} $${precio} c/u`)
    agregarBotonBorrar(nombre, $(`#producto-${idProducto(nombre)}`))
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
    agregarDivItemCarrito(producto.nombre, producto.precio, element.cantidad)
}
document.getElementById("totalCompra").innerText = `Total: $${carrito.calcularTotal()}`

let botonesDanger = document.getElementsByClassName("btn-danger");

for (let index = 0; index < botonesDanger.length; index++) {
    const element = botonesDanger[index];
    element.onclick = () => {
        const nombreProducto = element.parentNode.parentNode.querySelector('.card-title').innerText;
        const precioProducto = element.parentNode.parentNode.querySelector('.card-text').innerText.replace('$', '');
        const producto = new Producto(nombreProducto, parseInt(precioProducto), 0)
        
        const nuevoItemCarrito = new ItemCarrito(1, producto)
        const itemIgualPreexistente = carrito.conseguirItem(nuevoItemCarrito)
        if(itemIgualPreexistente){
            actualizarDivItemCarrito(producto.nombre, producto.precio, itemIgualPreexistente.cantidad + 1)
        }else {
            agregarDivItemCarrito(producto.nombre, producto.precio, 1)
        }
        carrito.agregarItem(nuevoItemCarrito)
        element.innerText = "Agregar más";
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
