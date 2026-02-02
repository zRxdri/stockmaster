const formulario = document.querySelector('#formulario-producto');
const listaProductos = document.querySelector('#lista-productos');
const buscador = document.querySelector('#buscador');

let inventario = JSON.parse(localStorage.getItem('productos')) || [];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    const precio = Number(document.querySelector('#precio').value);

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        cantidad,
        precio
    };

    inventario.push(nuevoProducto);
    guardarYRenderizar();
    
    formulario.reset();
});

function eliminarProducto(id) {
    inventario = inventario.filter(producto => producto.id !== id);
    guardarYRenderizar();
}

buscador.addEventListener('input', (e) => {
    const terminoBusqueda = e.target.value.toLowerCase();
    
    const productosFiltrados = inventario.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoBusqueda)
    );

    renderizarTabla(productosFiltrados);
});

function guardarYRenderizar() {
    localStorage.setItem('productos', JSON.stringify(inventario));
    renderizarTabla();
}

function renderizarTabla(datosAMostrar = inventario) {
    listaProductos.innerHTML = ''; 

    if (datosAMostrar.length === 0) {
        listaProductos.innerHTML = `
            <tr>
                <td colspan="5" class="p-4 text-center text-gray-500 italic">
                    No se encontraron productos
                </td>
            </tr>`;
        return;
    }

    datosAMostrar.forEach(producto => {
        const total = (producto.cantidad * producto.precio).toFixed(2);
        
        const fila = document.createElement('tr');
        fila.className = "border-b hover:bg-gray-50 transition";
        
        fila.innerHTML = `
            <td class="p-4 font-medium text-gray-800">${producto.nombre}</td>
            <td class="p-4 text-center">${producto.cantidad}</td>
            <td class="p-4 text-center">Bs ${producto.precio}</td>
            <td class="p-4 text-center font-bold text-blue-700">Bs ${total}</td>
            <td class="p-4 text-center">
                <button onclick="eliminarProducto(${producto.id})" class="text-red-500 hover:text-red-700 transition">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        listaProductos.appendChild(fila);
    });
}

renderizarTabla();