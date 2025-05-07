// Manejar el clic en el icono de la extensión
chrome.action.onClicked.addListener(async (tab) => {
  // Verificar que estamos en la página correcta
  if (tab.url.includes('demo.nothere.life')) {
    // Enviar mensaje al content script para activar/desactivar el bot
    await chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
  } else {
    // Alertar al usuario que está en una página incorrecta
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        alert('Esta extensión solo funciona en https://demo.nothere.life/demo/index.html');
      }
    });
  }
});
