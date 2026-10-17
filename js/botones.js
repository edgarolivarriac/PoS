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
            totalDeposito.textContent =
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




    // =====================================
    // BOTÓN 4: PAGO CON TARJETA
    // =====================================
    const btn4 = document.getElementById("btn4");
    const modalPago = document.getElementById("modalPagoTarjeta");
    const cerrarPagoTarjeta = document.getElementById("cerrarPagoTarjeta");
    const numeroPago = document.getElementById("numeroPago");
    const importePago = document.getElementById("importePago");
    const mensajePago = document.getElementById("mensajePago");
    const confirmarPago = document.getElementById("confirmarPago");

    btn4.addEventListener("click", function () {
        const carrito = document.getElementById("carrito");

        if (!carrito || carrito.querySelectorAll("tr").length === 0) {
            alert("Agrega productos al carrito antes de pagar.");
            return;
        }

        modalPago.style.display = "flex";
        numeroPago.value = "";
        mensajePago.textContent = "";

        const totalTexto = document.getElementById("total").textContent;
        importePago.textContent = totalTexto;

        numeroPago.focus();
    });

    numeroPago.addEventListener("input", function () {
        numeroPago.value = numeroPago.value
            .replace(/\D/g, "")
            .slice(0, 16);
    });

    cerrarPagoTarjeta.addEventListener("click", function () {
        modalPago.style.display = "none";
    });

    confirmarPago.addEventListener("click", function () {
    if (numeroPago.value.length !== 16) {
        mensajePago.style.color = "red";
        mensajePago.textContent = "Ingresa los 16 dígitos de la tarjeta.";
        return;
    }

    // Confirmar el pago simulado
    alert("¡Pago realizado correctamente!");

    // Vaciar los productos del carrito
    document.getElementById("carrito").innerHTML = "";

    // Reiniciar el total de la compra
    document.getElementById("total").textContent = "$0.00";

    // Cerrar el modal de pago
    modalPago.style.display = "none";

    // Limpiar los campos del modal
    numeroPago.value = "";
    mensajePago.textContent = "";
    importePago.textContent = "$0.00";
});

    // =====================================
    // BOTÓN 5: TRANSFERENCIA SIN COMISIÓN
    // =====================================
    const btn5 = document.getElementById("btn5");
    const modalTransferencia =
        document.getElementById("modalTransferencia");
    const cerrarTransferencia =
        document.getElementById("cerrarTransferencia");

    const tarjetaOrigen = document.getElementById("tarjetaOrigen");
    const tarjetaDestino = document.getElementById("tarjetaDestino");
    const mascaraOrigen = document.getElementById("mascaraOrigen");
    const mascaraDestino = document.getElementById("mascaraDestino");
    const montoTarjeta = document.getElementById("montoTarjeta");
    const importeTarjeta = document.getElementById("importeTarjeta");
    const totalTarjeta = document.getElementById("totalTarjeta");
    const confirmarPagoTarjeta =
        document.getElementById("confirmarPagoTarjeta");
    const mensajePagoTarjeta =
        document.getElementById("mensajePagoTarjeta");

    btn5.addEventListener("click", function () {
        modalTransferencia.style.display = "flex";

        tarjetaOrigen.value = "";
        tarjetaDestino.value = "";
        montoTarjeta.value = "";
        mascaraOrigen.textContent = "";
        mascaraDestino.textContent = "";
        mensajePagoTarjeta.textContent = "";
        importeTarjeta.textContent = "$0.00";
        totalTarjeta.textContent = "$0.00";
    });

    function configurarTarjeta(input, mascara) {
        input.addEventListener("input", function () {
            input.value = input.value.replace(/\D/g, "").slice(0, 16);

            mascara.textContent = input.value.length === 16
                ? "Tarjeta: •••• •••• •••• " + input.value.slice(-4)
                : input.value.length + " de 16 dígitos";
        });
    }

    configurarTarjeta(tarjetaOrigen, mascaraOrigen);
    configurarTarjeta(tarjetaDestino, mascaraDestino);

    montoTarjeta.addEventListener("input", function () {
        const monto = Number(montoTarjeta.value);
        const texto = monto > 0 && Number.isFinite(monto)
            ? "$" + monto.toFixed(2)
            : "$0.00";

        importeTarjeta.textContent = texto;
        totalTarjeta.textContent = texto;
    });

    cerrarTransferencia.addEventListener("click", function () {
        modalTransferencia.style.display = "none";
    });

    confirmarPagoTarjeta.addEventListener("click", function () {
        const origen = tarjetaOrigen.value;
        const destino = tarjetaDestino.value;
        const monto = Number(montoTarjeta.value);

        if (origen.length !== 16 || destino.length !== 16) {
            mensajePagoTarjeta.style.color = "red";
            mensajePagoTarjeta.textContent =
                "Ambas tarjetas deben tener 16 dígitos.";
            return;
        }

        if (origen === destino) {
            mensajePagoTarjeta.style.color = "red";
            mensajePagoTarjeta.textContent =
                "Las tarjetas deben ser diferentes.";
            return;
        }

        if (!montoTarjeta.value.trim() ||
            !Number.isFinite(monto) || monto <= 0) {
            mensajePagoTarjeta.style.color = "red";
            mensajePagoTarjeta.textContent =
                "Ingresa un monto válido.";
            return;
        }


        agregarProductoModal(
            "Transferencia •••• " + origen.slice(-4) +
            " a •••• " + destino.slice(-4),
            monto
        );

        // Cerrar el modal
        modalTransferencia.style.display = "none";

        // Reiniciar los campos para la siguiente transferencia
        tarjetaOrigen.value = "";
        tarjetaDestino.value = "";
        montoTarjeta.value = "";

        mascaraOrigen.textContent = "";
        mascaraDestino.textContent = "";
        mensajePagoTarjeta.textContent = "";

        importeTarjeta.textContent = "$0.00";
        totalTarjeta.textContent = "$0.00";

    });
});
