// Precios de las categorías de boletos
const PRECIOS = {
    vip: 50.00,
    butacas: 30.00,
    generales: 15.00
};

// Variables para almacenar los totales
let totalVip = 0;
let totalButacas = 0;
let totalGenerales = 0;
let cantidadVip = 0;
let cantidadButacas = 0;
let cantidadGenerales = 0;

// Array para almacenar el historial de ventas
let historialVentas = [];

// Referencias a elementos del DOM
const form = document.getElementById('ventaForm');
const tablaVentas = document.getElementById('tablaVentas').getElementsByTagName('tbody')[0];

// Elementos para mostrar los totales
const cantidadVipElement = document.getElementById('cantidadVip');
const totalVipElement = document.getElementById('totalVip');
const cantidadButacasElement = document.getElementById('cantidadButacas');
const totalButacasElement = document.getElementById('totalButacas');
const cantidadGeneralesElement = document.getElementById('cantidadGenerales');
const totalGeneralesElement = document.getElementById('totalGenerales');
const totalBoletosElement = document.getElementById('totalBoletos');
const totalVentasElement = document.getElementById('totalVentas');

// Evento para manejar el envío del formulario
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const cliente = document.getElementById('cliente').value;
    const categoria = document.getElementById('categoria').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    // Validar que se haya seleccionado una categoría
    if (categoria === '') {
        alert('Por favor, seleccione una categoría de boletos.');
        return;
    }
    
    // Calcular el total de la venta
    const precioUnitario = PRECIOS[categoria];
    const totalVenta = precioUnitario * cantidad;
    
    // Actualizar los totales por categoría
    actualizarTotales(categoria, cantidad, totalVenta);
    
    // Agregar la venta al historial
    agregarVentaHistorial(cliente, categoria, cantidad, totalVenta);
    
    // Actualizar la interfaz
    actualizarInterfaz();
    
    // Limpiar el formulario
    form.reset();
    
    // Mostrar mensaje de confirmación con animación
    mostrarMensajeConfirmacion();
});

// Función para actualizar los totales por categoría
function actualizarTotales(categoria, cantidad, totalVenta) {
    switch(categoria) {
        case 'vip':
            cantidadVip += cantidad;
            totalVip += totalVenta;
            break;
        case 'butacas':
            cantidadButacas += cantidad;
            totalButacas += totalVenta;
            break;
        case 'generales':
            cantidadGenerales += cantidad;
            totalGenerales += totalVenta;
            break;
    }
}

// Función para agregar una venta al historial
function agregarVentaHistorial(cliente, categoria, cantidad, totalVenta) {
    // Crear objeto de venta
    const venta = {
        cliente: cliente,
        categoria: categoria,
        cantidad: cantidad,
        total: totalVenta
    };
    
    // Agregar al array de historial
    historialVentas.push(venta);
    
    // Crear nueva fila en la tabla
    const nuevaFila = tablaVentas.insertRow();
    
    // Agregar celdas con los datos de la venta
    nuevaFila.insertCell(0).textContent = venta.cliente;
    nuevaFila.insertCell(1).textContent = obtenerNombreCategoria(venta.categoria);
    nuevaFila.insertCell(2).textContent = venta.cantidad;
    nuevaFila.insertCell(3).textContent = `$${venta.total.toFixed(2)}`;
    
    // Aplicar animación a la nueva fila
    nuevaFila.style.opacity = '0';
    setTimeout(() => {
        nuevaFila.style.transition = 'opacity 0.5s ease';
        nuevaFila.style.opacity = '1';
    }, 10);
}

// Función para obtener el nombre completo de la categoría
function obtenerNombreCategoria(categoria) {
    switch(categoria) {
        case 'vip':
            return 'Puestos VIP';
        case 'butacas':
            return 'Puestos Butacas';
        case 'generales':
            return 'Puestos Generales';
        default:
            return 'Desconocido';
    }
}

// Función para actualizar la interfaz con los totales
function actualizarInterfaz() {
    // Actualizar cantidades y totales por categoría
    cantidadVipElement.textContent = cantidadVip;
    totalVipElement.textContent = totalVip.toFixed(2);
    
    cantidadButacasElement.textContent = cantidadButacas;
    totalButacasElement.textContent = totalButacas.toFixed(2);
    
    cantidadGeneralesElement.textContent = cantidadGenerales;
    totalGeneralesElement.textContent = totalGenerales.toFixed(2);
    
    // Calcular y mostrar totales generales
    const totalBoletos = cantidadVip + cantidadButacas + cantidadGenerales;
    const totalVentas = totalVip + totalButacas + totalGenerales;
    
    totalBoletosElement.textContent = totalBoletos;
    totalVentasElement.textContent = totalVentas.toFixed(2);
    
    // Aplicar animación a los elementos actualizados
    aplicarAnimacionActualizacion();
}

// Función para aplicar animación a los elementos actualizados
function aplicarAnimacionActualizacion() {
    const elementosActualizados = [
        cantidadVipElement, totalVipElement,
        cantidadButacasElement, totalButacasElement,
        cantidadGeneralesElement, totalGeneralesElement,
        totalBoletosElement, totalVentasElement
    ];
    
    elementosActualizados.forEach(elemento => {
        elemento.style.transform = 'scale(1.1)';
        elemento.style.color = '#e74c3c';
        
        setTimeout(() => {
            elemento.style.transition = 'all 0.3s ease';
            elemento.style.transform = 'scale(1)';
            elemento.style.color = '';
        }, 300);
    });
}

// Función para mostrar mensaje de confirmación
function mostrarMensajeConfirmacion() {
    // Crear elemento de mensaje
    const mensaje = document.createElement('div');
    mensaje.textContent = '¡Venta registrada exitosamente!';
    mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.5s ease;
    `;
    
    // Agregar mensaje al documento
    document.body.appendChild(mensaje);
    
    // Mostrar mensaje con animación
    setTimeout(() => {
        mensaje.style.opacity = '1';
        mensaje.style.transform = 'translateX(0)';
    }, 10);
    
    // Ocultar y eliminar mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.style.opacity = '0';
        mensaje.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            document.body.removeChild(mensaje);
        }, 500);
    }, 3000);
}

// Inicializar la interfaz
actualizarInterfaz();
