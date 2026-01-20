/**
 * Tarea: Diseño de una Lista Dinámica con Plantillas Básicas en JavaScript
 * Semana 7
 * 
 * Este script implementa:
 * 1. Un array de productos inicial
 * 2. Funciones para renderizar productos dinámicamente usando plantillas
 * 3. Funcionalidad para agregar nuevos productos
 * 4. Manejo básico del DOM
 */

// Array inicial de productos
let productos = [
    {
        id: 1,
        nombre: "Laptop Gaming",
        precio: 1299.99,
        descripcion: "Laptop de alto rendimiento para juegos y trabajo intensivo."
    },
    {
        id: 2,
        nombre: "Smartphone Android",
        precio: 499.99,
        descripcion: "Teléfono inteligente con cámara de alta resolución y pantalla AMOLED."
    },
    {
        id: 3,
        nombre: "Tablet Digital",
        precio: 349.99,
        descripcion: "Tablet ideal para lectura, navegación y tareas multimedia."
    },
    {
        id: 4,
        nombre: "Auriculares Inalámbricos",
        precio: 199.99,
        descripcion: "Auriculares con cancelación de ruido y conectividad Bluetooth."
    },
    {
        id: 5,
        nombre: "Smartwatch Deportivo",
        precio: 249.99,
        descripcion: "Reloj inteligente con monitor de frecuencia cardíaca y GPS integrado."
    }
];

// Variable para el siguiente ID de producto
let siguienteId = 6;

// Referencias a elementos del DOM
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');
const resetBtn = document.getElementById('resetBtn');
const addCustomProductBtn = document.getElementById('addCustomProductBtn');
const productCount = document.getElementById('productCount');
const emptyState = document.getElementById('emptyState');

// Referencias a los campos del formulario
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productDescriptionInput = document.getElementById('productDescription');

/**
 * Plantilla para crear el HTML de cada producto
 * @param {Object} producto - El objeto producto con id, nombre, precio y descripcion
 * @returns {string} HTML del producto como elemento <li>
 */
function crearPlantillaProducto(producto) {
    return `
        <li class="product-item" data-id="${producto.id}">
            <div class="product-header">
                <h3 class="product-name">${producto.nombre}</h3>
                <span class="product-price">$${producto.precio.toFixed(2)}</span>
            </div>
            <p class="product-description">${producto.descripcion}</p>
            <div class="product-footer">
                <span class="product-id">ID: ${producto.id}</span>
                <button class="btn-delete" data-id="${producto.id}">
                    Eliminar
                </button>
            </div>
        </li>
    `;
}

/**
 * Renderiza todos los productos en la lista <ul>
 */
function renderizarProductos() {
    // Limpiar la lista actual
    productList.innerHTML = '';
    
    // Verificar si hay productos
    if (productos.length === 0) {
        emptyState.style.display = 'block';
        productList.style.display = 'none';
        productCount.textContent = '0';
        return;
    }
    
    // Ocultar el estado vacío y mostrar la lista
    emptyState.style.display = 'none';
    productList.style.display = 'block';
    
    // Actualizar contador
    productCount.textContent = productos.length;
    
    // Renderizar cada producto usando la plantilla
    productos.forEach(producto => {
        const productoHTML = crearPlantillaProducto(producto);
        productList.innerHTML += productoHTML;
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            eliminarProducto(id);
        });
    });
}

/**
 * Agrega un nuevo producto a la lista
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio del producto
 * @param {string} descripcion - Descripción del producto
 * @returns {boolean} true si se agregó correctamente, false si hubo error
 */
function agregarProducto(nombre, precio, descripcion) {
    // Validar que los campos no estén vacíos
    if (!nombre || !nombre.trim()) {
        alert('Por favor, ingresa un nombre para el producto.');
        return false;
    }
    
    if (!precio || precio <= 0) {
        alert('Por favor, ingresa un precio válido para el producto.');
        return false;
    }
    
    if (!descripcion || !descripcion.trim()) {
        alert('Por favor, ingresa una descripción para el producto.');
        return false;
    }
    
    // Crear nuevo producto
    const nuevoProducto = {
        id: siguienteId++,
        nombre: nombre.trim(),
        precio: parseFloat(precio),
        descripcion: descripcion.trim()
    };
    
    // Agregar al array
    productos.push(nuevoProducto);
    
    // Renderizar la lista actualizada
    renderizarProductos();
    
    return true;
}

/**
 * Agrega un producto predefinido (para el botón principal)
 */
function agregarProductoPredefinido() {
    const productosPredefinidos = [
        {
            nombre: "Monitor 4K",
            precio: 399.99,
            descripcion: "Monitor de 27 pulgadas con resolución 4K y tasa de refresco de 144Hz."
        },
        {
            nombre: "Teclado Mecánico",
            precio: 89.99,
            descripcion: "Teclado mecánico con retroiluminación RGB y switches táctiles."
        },
        {
            nombre: "Mouse Inalámbrico",
            precio: 59.99,
            descripcion: "Mouse ergonómico con sensor de alta precisión y batería de larga duración."
        },
        {
            nombre: "Altavoz Bluetooth",
            precio: 129.99,
            descripcion: "Altavoz portátil con sonido estéreo y resistencia al agua."
        },
        {
            nombre: "Cámara Web HD",
            precio: 79.99,
            descripcion: "Cámara web con micrófono integrado y enfoque automático."
        }
    ];
    
    // Seleccionar un producto aleatorio
    const productoAleatorio = productosPredefinidos[Math.floor(Math.random() * productosPredefinidos.length)];
    
    // Agregar el producto
    const resultado = agregarProducto(
        productoAleatorio.nombre, 
        productoAleatorio.precio, 
        productoAleatorio.descripcion
    );
    
    if (resultado) {
        console.log(`Producto predefinido agregado: ${productoAleatorio.nombre}`);
    }
}

/**
 * Elimina un producto de la lista
 * @param {number} id - ID del producto a eliminar
 */
function eliminarProducto(id) {
    // Filtrar el array para eliminar el producto con el ID especificado
    const nuevoArray = productos.filter(producto => producto.id !== id);
    
    // Verificar si se eliminó algún producto
    if (nuevoArray.length === productos.length) {
        console.log(`No se encontró producto con ID ${id}`);
        return;
    }
    
    // Actualizar el array de productos
    productos = nuevoArray;
    
    // Renderizar la lista actualizada
    renderizarProductos();
    
    console.log(`Producto con ID ${id} eliminado`);
}

/**
 * Restablece la lista a los productos iniciales
 */
function restablecerLista() {
    // Restaurar los productos iniciales
    productos = [
        {
            id: 1,
            nombre: "Laptop Gaming",
            precio: 1299.99,
            descripcion: "Laptop de alto rendimiento para juegos y trabajo intensivo."
        },
        {
            id: 2,
            nombre: "Smartphone Android",
            precio: 499.99,
            descripcion: "Teléfono inteligente con cámara de alta resolución y pantalla AMOLED."
        },
        {
            id: 3,
            nombre: "Tablet Digital",
            precio: 349.99,
            descripcion: "Tablet ideal para lectura, navegación y tareas multimedia."
        }
    ];
    
    // Restablecer el siguiente ID
    siguienteId = 4;
    
    // Renderizar la lista
    renderizarProductos();
    
    console.log('Lista restablecida a los productos iniciales');
}

/**
 * Limpia los campos del formulario
 */
function limpiarFormulario() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productDescriptionInput.value = '';
}

/**
 * Maneja el evento de agregar producto personalizado
 */
function manejarAgregarProductoPersonalizado() {
    const nombre = productNameInput.value;
    const precio = productPriceInput.value;
    const descripcion = productDescriptionInput.value;
    
    const resultado = agregarProducto(nombre, precio, descripcion);
    
    if (resultado) {
        // Limpiar formulario si se agregó correctamente
        limpiarFormulario();
        
        // Enfocar el primer campo para facilitar la entrada de otro producto
        productNameInput.focus();
    }
}

// Inicializar la aplicación cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicación de lista de productos cargada correctamente.');
    
    // Renderizar los productos iniciales
    renderizarProductos();
    
    // Agregar evento al botón "Agregar Producto" (producto predefinido)
    addProductBtn.addEventListener('click', agregarProductoPredefinido);
    
    // Agregar evento al botón "Restablecer Lista"
    resetBtn.addEventListener('click', restablecerLista);
    
    // Agregar evento al botón "Agregar Producto Personalizado"
    addCustomProductBtn.addEventListener('click', manejarAgregarProductoPersonalizado);
    
    // Permitir agregar producto con Enter en los campos
    [productNameInput, productPriceInput, productDescriptionInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                manejarAgregarProductoPersonalizado();
            }
        });
    });
    
    // Mostrar información inicial en consola
    console.log(`Productos iniciales cargados: ${productos.length}`);
    console.log('Instrucciones:');
    console.log('- Haz clic en "Agregar Producto" para añadir productos predefinidos');
    console.log('- Usa el formulario para agregar productos personalizados');
    console.log('- Haz clic en "Eliminar" para quitar productos de la lista');
    console.log('- Haz clic en "Restablecer Lista" para volver a los productos iniciales');
});
