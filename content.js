// Variables de control
let isRunning = false;
let intervalId = null;

// Función para encontrar el canvas del juego
function getGameCanvas() {
  return document.querySelector('canvas');
}

// Función para enviar eventos de teclado al canvas
function pressKey(key, code) {
  const canvas = getGameCanvas();
  
  if (!canvas) {
    console.warn('NotHereBot: Canvas no encontrado');
    return;
  }
  
  // Asegurar que el canvas tiene el foco
  canvas.focus();
  
  // Enviar evento keydown
  canvas.dispatchEvent(new KeyboardEvent('keydown', {
    key: key,
    code: code,
    bubbles: true,
    cancelable: true,
    view: window
  }));
  
  // Enviar evento keyup después de un breve retraso
  setTimeout(() => {
    canvas.dispatchEvent(new KeyboardEvent('keyup', {
      key: key,
      code: code,
      bubbles: true,
      cancelable: true,
      view: window
    }));
  }, 30); // Reducido de 100ms a 30ms para mayor velocidad
}

// Función para iniciar el bot
function startBot() {
  if (isRunning) return;
  
  console.log('NotHereBot: Iniciando automovimiento rápido...');
  
  const canvas = getGameCanvas();
  if (!canvas) {
    console.error('NotHereBot: No se encontró el canvas del juego');
    return;
  }
  
  // Click en el canvas para asegurar que tiene foco
  canvas.click();
  
  isRunning = true;
  
  // Movimiento en loop mucho más rápido
  intervalId = setInterval(() => {
    // Secuencia rápida de movimientos
    pressKey('ArrowUp', 'ArrowUp');
    
    // Movimientos adicionales con menos retraso
    setTimeout(() => pressKey('ArrowRight', 'ArrowRight'), 50);
    
    // Alternancia entre varias teclas para máxima velocidad
    setTimeout(() => pressKey('ArrowUp', 'ArrowUp'), 100);
    setTimeout(() => pressKey('ArrowRight', 'ArrowRight'), 150);
  }, 200); // Reducido de 1500ms a 200ms para mayor frecuencia
}

// Función para modo turbo (extremadamente rápido)
function startTurboBot() {
  if (isRunning) stopBot();
  
  console.log('NotHereBot: ¡MODO TURBO ACTIVADO!');
  
  const canvas = getGameCanvas();
  if (!canvas) {
    console.error('NotHereBot: No se encontró el canvas del juego');
    return;
  }
  
  // Click en el canvas para asegurar que tiene foco
  canvas.click();
  
  isRunning = true;
  
  // Secuencias de teclas muy rápidas
  intervalId = setInterval(() => {
    // Presionar múltiples teclas en secuencia muy rápida
    ['ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowRight'].forEach((key, index) => {
      setTimeout(() => pressKey(key, key), index * 20);
    });
  }, 100); // Ciclo extremadamente rápido
}

// Función para detener el bot
function stopBot() {
  if (!isRunning) return;
  
  console.log('NotHereBot: Deteniendo automovimiento...');
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
}

// Comando para iniciar/detener el bot desde la consola
window.NotHereBot = {
  start: startBot,
  stop: stopBot,
  toggle: function() {
    isRunning ? stopBot() : startBot();
  },
  turbo: startTurboBot // Nuevo modo turbo
};

// Escuchar mensajes del background script o popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Para activar/desactivar el bot
  if (message.action === 'toggle') {
    window.NotHereBot.toggle();
    sendResponse({ success: true, isRunning });
    return true; // Indica que se enviará una respuesta asíncrona
  }
  
  // Para activar modo turbo
  if (message.action === 'turbo') {
    window.NotHereBot.turbo();
    sendResponse({ success: true, isRunning: true });
    return true;
  }
  
  // Para obtener el estado actual del bot
  if (message.action === 'getStatus') {
    sendResponse({ isRunning });
    return true;
  }
});

// Esperar a que el juego cargue completamente
setTimeout(() => {
  console.log('NotHereBot: Listo para usar. Para velocidad máxima usa NotHereBot.turbo() en la consola');
}, 2000);
