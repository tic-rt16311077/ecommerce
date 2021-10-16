self.addEventListener('install', event=>{
    console.log('Se instala SW... Nuevo');
});

self.addEventListener('activate', event =>{
    console.log('el SW se ha activado');
});