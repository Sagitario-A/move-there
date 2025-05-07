let botActive = false;
let currentDirection = null;

// Cuando se carga el popup
document.addEventListener('DOMContentLoaded', async () => {
  const stopButton = document.getElementById('stopButton');
  const statusText = document.getElementById('statusText');
  const debugInfo = document.getElementById('debugInfo');
  
  // Configuración de depuración - Deshabilitada
  const DEBUG = false;
  
  // Mostrar información de depuración si está habilitado
  function debug(message) {
    if (!DEBUG) return;
    console.log(message); // Solo log de consola, sin mostrar en la interfaz
  }
  
  // Botones de dirección
  const directionButtons = {
    up: document.getElementById('up'),
    down: document.getElementById('down'),
    left: document.getElementById('left'),
    right: document.getElementById('right'),
    upLeft: document.getElementById('upLeft'),
    upRight: document.getElementById('upRight'),
    downLeft: document.getElementById('downLeft'),
    downRight: document.getElementById('downRight')
  };
  
  // Obtener la pestaña activa
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  
  // Verificar si estamos en la página correcta
  if (!currentTab.url.includes('demo.nothere.life')) {
    statusText.textContent = 'Error: Página incorrecta';
    statusText.style.color = 'red';
    stopButton.disabled = true;
    
    // Deshabilitar todos los botones de dirección
    Object.values(directionButtons).forEach(btn => {
      if (btn) btn.disabled = true;
    });
    
    return;
  }
  
  // Intenta obtener el estado actual del bot
  try {
    const response = await chrome.tabs.sendMessage(currentTab.id, { action: 'getStatus' });
    botActive = response && response.isRunning;
    currentDirection = response && response.currentDirection;
    debug(`Estado inicial: Activo=${botActive}, Dirección=${currentDirection}`);
    updateUI();
  } catch (error) {
    console.error('Error al obtener el estado:', error);
    debug(`Error obteniendo estado: ${error.message}`);
  }
  
  // Manejar clic en el botón detener
  stopButton.addEventListener('click', async () => {
    try {
      debug('Clic en botón detener');
      await chrome.tabs.sendMessage(currentTab.id, { action: 'stop' });
      botActive = false;
      currentDirection = null;
      updateUI();
    } catch (error) {
      console.error('Error al detener el bot:', error);
      debug(`Error detener: ${error.message}`);
      statusText.textContent = 'Error: Recarga la página';
      statusText.style.color = 'red';
    }
  });
  
  // Función para actualizar el estado desde el content script
  async function updateStatus() {
    try {
      const response = await chrome.tabs.sendMessage(currentTab.id, { action: 'getStatus' });
      botActive = response && response.isRunning;
      currentDirection = response && response.currentDirection;
      debug(`Estado actualizado: Activo=${botActive}, Dirección=${currentDirection}`);
      updateUI();
    } catch (error) {
      console.error('Error al obtener estado:', error);
      debug(`Error obteniendo estado: ${error.message}`);
    }
  }
  
  // Configurar eventos para botones de dirección
  Object.entries(directionButtons).forEach(([direction, button]) => {
    if (!button) return;
    
    button.addEventListener('click', async () => {
      try {
        debug(`Clic en dirección: ${direction}`);
        
        // Enviar mensaje para cambiar dirección
        await chrome.tabs.sendMessage(currentTab.id, { 
          action: 'move', 
          direction: direction 
        });
        
        // Actualizar estado
        await updateStatus();
      } catch (error) {
        console.error(`Error al mover en dirección ${direction}:`, error);
        debug(`Error moviendo: ${error.message}`);
        statusText.textContent = 'Error: Recarga la página';
        statusText.style.color = 'red';
      }
    });
  });
  
  function updateUI() {
    debug(`Actualizando UI con: Activo=${botActive}, Dirección=${currentDirection}`);
    
    // Limpiar estado activo de todos los botones de dirección
    Object.values(directionButtons).forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
    
    // Mostrar u ocultar el botón de parada según el estado
    if (stopButton) {
      stopButton.style.visibility = botActive ? 'visible' : 'hidden';
    }
    
    if (!botActive) {
      statusText.textContent = 'Estado: Desactivado';
      statusText.style.color = 'red';
      return;
    }
    
    // Activar el botón de dirección correspondiente
    if (currentDirection && directionButtons[currentDirection]) {
      debug(`Activando botón: ${currentDirection}`);
      directionButtons[currentDirection].classList.add('active');
    }
    
    statusText.textContent = `Estado: ${getDirectionText(currentDirection)}`;
    statusText.style.color = 'green';
  }
  
  // Función para obtener texto descriptivo de la dirección
  function getDirectionText(direction) {
    const dirTexts = {
      'up': 'Arriba',
      'down': 'Abajo',
      'left': 'Izquierda',
      'right': 'Derecha',
      'upLeft': 'Arriba-Izquierda',
      'upRight': 'Arriba-Derecha',
      'downLeft': 'Abajo-Izquierda',
      'downRight': 'Abajo-Derecha'
    };
    
    return dirTexts[direction] || 'Activo';
  }
}); 