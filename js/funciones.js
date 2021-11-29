function agregaCarrito() {
    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
        alert("Este navegador no soporta las notificaciones del sistema");
    }

    // Comprobamos si ya nos habían dado permiso
    else if (Notification.permission === "granted") {
        // Si esta correcto lanzamos la notificación
        var notification = new Notification("Se Agrego su Producto al Carrito");
    }

    // Si no, tendremos que pedir permiso al usuario
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
        // Si el usuario acepta, lanzamos la notificación
        if (permission === "granted") {
            var notification = new Notification("Se Agrego su Producto al Carrito");
        }
        });
    }
}