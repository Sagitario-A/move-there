// Manejar el clic en el icono de la extensión
chrome.action.onClicked.addListener(async (tab) => {
  // Verificar que estamos en la página correcta
  if (!tab.url.includes('demo.nothere.life')) {
    // Alertar al usuario que está en una página incorrecta
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        alert('Esta extensión solo funciona en https://demo.nothere.life/demo/index.html');
      }
    });
  }
  // No se requiere ninguna acción adicional aquí, 
  // ya que el popup se abrirá automáticamente al hacer clic en el icono
});

// No necesitamos hacer nada más en el background script,
// el popup se encargará de todo cuando se abra.
