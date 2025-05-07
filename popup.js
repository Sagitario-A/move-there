let botActive = false;

// Cuando se carga el popup
document.addEventListener('DOMContentLoaded', async () => {
  const toggleButton = document.getElementById('toggleButton');
  const turboButton = document.getElementById('turboButton');
  const statusText = document.getElementById('statusText');
  
  // Obtener la pestaña activa
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  
  // Verificar si estamos en la página correcta
  if (!currentTab.url.includes('demo.nothere.life')) {
    statusText.textContent = 'Error: Página incorrecta';
    statusText.style.color = 'red';
    toggleButton.disabled = true;
    turboButton.disabled = true;
    return;
  }
  
  // Intenta obtener el estado actual del bot
  try {
    const response = await chrome.tabs.sendMessage(currentTab.id, { action: 'getStatus' });
    botActive = response && response.isRunning;
    updateUI();
  } catch (error) {
    console.error('Error al obtener el estado:', error);
  }
  
  // Manejar clic en el botón de alternar
  toggleButton.addEventListener('click', async () => {
    try {
      await chrome.tabs.sendMessage(currentTab.id, { action: 'toggle' });
      botActive = !botActive;
      updateUI();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      statusText.textContent = 'Error: Recarga la página';
      statusText.style.color = 'red';
    }
  });
  
  // Manejar clic en el botón turbo
  turboButton.addEventListener('click', async () => {
    try {
      await chrome.tabs.sendMessage(currentTab.id, { action: 'turbo' });
      botActive = true;
      updateUI('TURBO');
    } catch (error) {
      console.error('Error al activar modo turbo:', error);
      statusText.textContent = 'Error: Recarga la página';
      statusText.style.color = 'red';
    }
  });
  
  function updateUI(mode = '') {
    if (mode === 'TURBO') {
      statusText.textContent = 'Estado: MODO TURBO';
      statusText.style.color = '#f44336';
      toggleButton.textContent = 'Detener Bot';
    } else {
      statusText.textContent = botActive ? 'Estado: Activado' : 'Estado: Desactivado';
      statusText.style.color = botActive ? 'green' : 'red';
      toggleButton.textContent = botActive ? 'Detener Bot' : 'Iniciar Bot';
    }
  }
}); 