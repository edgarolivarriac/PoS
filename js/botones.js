console.log("botones.js cargado");

function abrirModalProducto() {

    var btn1 = document.getElementById("btn1");
    var modal = document.getElementById("modalProductos");
    var cerrar = document.getElementById("cerrar");

    // BOTÓN 1 ABRE EL MODAL
    btn1.onclick = function () {

        modal.style.display = "block";

    }

    // CERRAR MODAL
    cerrar.onclick = function () {

        modal.style.display = "none";

    }

    // Botón 2

    var btn2 = document.getElementById("btn2");
    var modal2 = document.getElementById("modalCafe");
    var cerrarBtn2 = document.getElementById("cerrarBtn2");

    // BOTÓN 2 ABRE EL MODAL
   btn2.onclick = function () {
    console.log("Se presionó el botón 2: CAFÉ");

    modal.style.display = "none";
    modal2.style.display = "flex";

    document.getElementById("modalDepositos").style.display = "none";
};
    // CERRAR MODAL 2
    cerrarBtn2.onclick = function () {

        modal2.style.display = "none";

    }

    // SELECCIONAR PAPITA Y AGREGAR AL CARRITO
    var papitas = document.querySelectorAll(".papita");

    papitas.forEach(function (papita) {

        papita.onclick = function () {

            var nombre = papita.dataset.nombre;
            var precio = Number(papita.dataset.precio);

            agregarProductoModal(nombre, precio);

            modal.style.display = "none";

        }

    });

    // Seleccionar tamaño de café

    var tamanoCafe = document.querySelectorAll(".tamanoCafe");

    tamanoCafe.forEach(function (cafe) {

        cafe.onclick = function () {

            var nombre = cafe.dataset.nombre;
            var precio = Number(cafe.dataset.precio);

            agregarProductoModal(nombre, precio);

            modal2.style.display = "none";

        }

    });

}

window.onload = function () {

    abrirModalProducto();

};

document.addEventListener("DOMContentLoaded", function () {

    const btn3 = document.getElementById("btn3");

    const modal = document.getElementById("modalDepositos");
    const cerrar = document.getElementById("cerrarDepositos");

    const tarjeta1 = document.getElementById("tarjeta1");
    const tarjeta2 = document.getElementById("tarjeta2");
    const confirmar = document.getElementById("confirmarDeposito");
    const mensaje = document.getElementById("mensajeDeposito");

    const modalCantidad = document.getElementById("modalCantidad");
    const cerrarCantidad = document.getElementById("cerrarCantidad");
    const montoDeposito = document.getElementById("montoDeposito");
    const importeDeposito = document.getElementById("importeDeposito");
    const totalDeposito = document.getElementById("totalDeposito");
    const confirmarCantidad = document.getElementById("confirmarCantidad");
    const mensajeCantidad = document.getElementById("mensajeCantidad");

    const COMISION_DEPOSITO = 12;

    const tarjetaEnmascarada =
    document.getElementById("tarjetaEnmascarada");

tarjeta1.addEventListener("input", function () {
    // Permitir solamente números y limitar a 16 dígitos
    tarjeta1.value = tarjeta1.value
        .replace(/\D/g, "")
        .slice(0, 16);

    const numero = tarjeta1.value;

    if (numero.length === 16) {
        tarjetaEnmascarada.textContent =
            "Tarjeta: •••• •••• •••• " + numero.slice(-4);
    } else {
        tarjetaEnmascarada.textContent =
            "Dígitos ingresados: " + numero.length + " de 16";
    }
}); 

    // Abrir el modal de depósitos con el botón 3
    btn3.onclick = function () {
    console.log("Se presionó el botón 3: DEPÓSITOS");

    document.getElementById("modalCafe").style.display = "none";
    modal.style.display = "flex";

    mensaje.textContent = "";
    tarjeta1.value = "";
    tarjeta2.value = "";

    modalCantidad.style.display = "none";
    tarjeta1.focus();
};

    // Cerrar el primer modal
    function cerrarModal() {
        modal.style.display = "none";
    }

    cerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Validar las tarjetas
    confirmar.addEventListener("click", function () {

        const numero1 = tarjeta1.value.trim();
        const numero2 = tarjeta2.value.trim();

    if (numero1.length !== 16 || numero2.length !== 16) {
    mensaje.style.color = "red";
    mensaje.textContent =
        "Debes ingresar los 16 dígitos en ambos campos.";
    return;
}   
        if (!/^\d+$/.test(numero1) ||
            !/^\d+$/.test(numero2)) {
            mensaje.style.color = "red";
            mensaje.textContent =
                "Los números deben contener solamente dígitos.";
            return;
        }

        if (numero1 !== numero2) {
            mensaje.style.color = "red";
            mensaje.textContent =
                "Los números de tarjeta no coinciden.";
            return;
        }

        // Abrir el modal de cantidad
        modal.style.display = "none";
        modalCantidad.style.display = "flex";

        mensaje.textContent = "";
        mensajeCantidad.textContent = "";
        montoDeposito.value = "";
        importeDeposito.textContent = "$0.00";
        totalDeposito.textContent =
            "$" + COMISION_DEPOSITO.toFixed(2);

        montoDeposito.focus();
    });

    // Cerrar el segundo modal
    cerrarCantidad.addEventListener("click", function () {
        modalCantidad.style.display = "none";
    });

    modalCantidad.addEventListener("click", function (event) {
        if (event.target === modalCantidad) {
            modalCantidad.style.display = "none";
        }
    });

    // Calcular depósito + comisión
    montoDeposito.addEventListener("input", function () {

        const monto = Number(montoDeposito.value);

        if (monto > 0 && Number.isFinite(monto)) {
            importeDeposito.textContent =
                "$" + monto.toFixed(2);

            totalDeposito.textContent =
                "$" + (monto + COMISION_DEPOSITO).toFixed(2);
        } else {
            importeDeposito.textContent = "$0.00";
            totalDeposito.textContent    =
                "$" + COMISION_DEPOSITO.toFixed(2);
        }

        mensajeCantidad.textContent = "";
    });

    // Confirmar el depósito
  
confirmarCantidad.addEventListener("click", function () {

    const montoTexto = montoDeposito.value.trim();
    const monto = Number(montoTexto);

    if (
        montoTexto === "" ||
        !Number.isFinite(monto) ||
        monto <= 0
    ) {
        mensajeCantidad.style.color = "red";
        mensajeCantidad.textContent =
            "Ingresa un monto válido para el depósito.";
        return;
    }

    const total = monto + COMISION_DEPOSITO;

    // Agregar el depósito al carrito, incluyendo la comisión
    agregarProductoModal(
        "Depósito $" + monto.toFixed(2) +
        " + comisión $" + COMISION_DEPOSITO.toFixed(2),
        total
    );

    mensajeCantidad.style.color = "green";
    mensajeCantidad.textContent =
        "Depósito agregado al carrito. Total: $" +
        total.toFixed(2);

    // Cerrar el modal después de agregarlo
    modalCantidad.style.display = "none";
});

});

