if(navigator.serviceWorker){
    console.log("Se encontro ServiceWorker");
    navigator.serviceWorker.register('/sw.js');
}else{
    console.log("No se encontro SW");
}