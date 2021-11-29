if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
        // Si es exitoso
             console.log('SW registrado correctamente');
      });
  
}

  
  


	