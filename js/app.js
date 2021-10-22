//if(navigator.serviceWorker){
//    console.log("Se encontro ServiceWorker");
//    navigator.serviceWorker.register('/sw.js');
//}else{
//    console.log("No se encontro SW");
//}

/*if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/sw.js', {
        scope: '.' // <--- THIS BIT IS REQUIRED
    }).then(function(registration) {
        // Registration was successful
        console.log('El serviceWorker se Registro Satisfactoriamente son el scope: ', registration.scope);
    }, function(err) {
        // registration failed :(
        console.log('Fallo al Registrar el ServiceWorker: ', err);
    });
}*/

if (navigator.serviceWorker.controller) {
    console.log("Se Encontro un ServiceWorker");
    } 
    else
    {
        navigator.serviceWorker.register("/sw.js", {
        scope: "./"
        })
        .then(function (reg) {
        console.log("El serviceWorker se Registro Satisfactoriamente");
    });
};
