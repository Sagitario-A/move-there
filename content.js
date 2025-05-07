// Variables de control
let isRunning = false;
let intervalId = null;
let currentDirection = null;
let diagonalKeyIndex = 0; // Índice para alternar entre teclas en diagonales

// Direcciones de movimiento
const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  UP_LEFT: 'upLeft',
  UP_RIGHT: 'upRight',
  DOWN_LEFT: 'downLeft',
  DOWN_RIGHT: 'downRight'
};

// Mapeo de direcciones a teclas
const DIRECTION_KEYS = {
  [DIRECTIONS.UP]: ['ArrowUp'],
  [DIRECTIONS.DOWN]: ['ArrowDown'],
  [DIRECTIONS.LEFT]: ['ArrowLeft'],
  [DIRECTIONS.RIGHT]: ['ArrowRight'],
  [DIRECTIONS.UP_LEFT]: ['ArrowUp', 'ArrowLeft'],
  [DIRECTIONS.UP_RIGHT]: ['ArrowUp', 'ArrowRight'],
  [DIRECTIONS.DOWN_LEFT]: ['ArrowDown', 'ArrowLeft'],
  [DIRECTIONS.DOWN_RIGHT]: ['ArrowDown', 'ArrowRight']
};

// Función para obtener el canvas del juego
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
  }, 20); // Reducido para mayor velocidad
}

// Función para determinar si una dirección es válida
function isValidDirection(direction) {
  return Object.values(DIRECTIONS).includes(direction);
}

// Función para mover en una dirección
function moveInDirection(direction) {
  if (!isValidDirection(direction)) {
    console.error('NotHereBot: Dirección no válida:', direction);
    return;
  }
  
  // Obtener las teclas para esta dirección
  const keys = DIRECTION_KEYS[direction];
  
  if (!keys || keys.length === 0) {
    console.error('NotHereBot: No hay teclas definidas para la dirección:', direction);
    return;
  }
  
  const canvas = getGameCanvas();
  if (!canvas) {
    console.error('NotHereBot: No se encontró el canvas del juego');
    return;
  }
  
  // Para direcciones diagonales (que tienen dos teclas), alternar entre ambas muy rápidamente
  if (keys.length > 1) {
    // Usar el índice para alternar entre teclas
    const currentKeyIndex = diagonalKeyIndex % keys.length;
    const key = keys[currentKeyIndex];
    
    // Presionar la tecla actual
    pressKey(key, key);
    
    // Incrementar el índice para la próxima iteración
    diagonalKeyIndex++;
  } else {
    // Para direcciones simples, solo presionar la tecla
    pressKey(keys[0], keys[0]);
  }
}

// Función para iniciar el movimiento en una dirección específica
function startDirectionalMovement(direction) {
  stopBot(); // Detener cualquier movimiento anterior
  
  if (!direction || direction === 'stop') {
    console.log('NotHereBot: Movimiento detenido');
    return;
  }
  
  // Verificar que la dirección sea válida
  if (!isValidDirection(direction)) {
    console.error('NotHereBot: Dirección no válida para movimiento:', direction);
    return;
  }
  
  console.log(`NotHereBot: Iniciando movimiento en dirección: ${direction}`);
  
  const canvas = getGameCanvas();
  if (!canvas) {
    console.error('NotHereBot: No se encontró el canvas del juego');
    return;
  }
  
  // Click en el canvas para asegurar que tiene foco
  canvas.click();
  
  isRunning = true;
  currentDirection = direction;
  diagonalKeyIndex = 0;
  
  // Determinar el intervalo adecuado según el tipo de dirección
  const keys = DIRECTION_KEYS[direction];
  const intervalTime = (keys && keys.length > 1) ? 50 : 80; // Más rápido para diagonales
  
  // Mover continuamente en la dirección especificada
  intervalId = setInterval(() => {
    // Para direcciones diagonales, ciclo de alta velocidad
    if (keys && keys.length > 1) {
      // Ejecutar varias veces para maximizar velocidad
      for (let i = 0; i < 3; i++) {
        setTimeout(() => moveInDirection(direction), i * 15);
      }
    } else {
      // Para direcciones cardinales, presionar normalmente
      moveInDirection(direction);
    }
  }, intervalTime);
}

// Función para detener el bot
function stopBot() {
  if (!isRunning) return;
  
  console.log('NotHereBot: Deteniendo automovimiento...');
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  // Mantener la última dirección seleccionada
}

// Comando para iniciar/detener el bot desde la consola
window.NotHereBot = {
  stop: stopBot,
  // Comandos para mover en direcciones específicas
  moveUp: function() { startDirectionalMovement(DIRECTIONS.UP); },
  moveDown: function() { startDirectionalMovement(DIRECTIONS.DOWN); },
  moveLeft: function() { startDirectionalMovement(DIRECTIONS.LEFT); },
  moveRight: function() { startDirectionalMovement(DIRECTIONS.RIGHT); },
  moveUpLeft: function() { startDirectionalMovement(DIRECTIONS.UP_LEFT); },
  moveUpRight: function() { startDirectionalMovement(DIRECTIONS.UP_RIGHT); },
  moveDownLeft: function() { startDirectionalMovement(DIRECTIONS.DOWN_LEFT); },
  moveDownRight: function() { startDirectionalMovement(DIRECTIONS.DOWN_RIGHT); },
  getStatus: function() {
    return {
      isRunning,
      currentDirection
    };
  }
};

// Escuchar mensajes del background script o popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Para detener explícitamente
  if (message.action === 'stop') {
    window.NotHereBot.stop();
    sendResponse({ success: true, isRunning: false, currentDirection: null });
    return true;
  }
  
  // Para mover en una dirección específica
  if (message.action === 'move' && message.direction) {
    const direction = message.direction;
    
    // Manejar correctamente las direcciones
    if (direction === 'stop') {
      stopBot();
      sendResponse({ success: true, isRunning: false, currentDirection: null });
    } else {
      // Convertir el ID del botón a la constante de dirección correspondiente
      let targetDirection;
      
      // Mapeo directo entre IDs de botones y constantes de dirección
      switch (direction) {
        case 'up': targetDirection = DIRECTIONS.UP; break;
        case 'down': targetDirection = DIRECTIONS.DOWN; break;
        case 'left': targetDirection = DIRECTIONS.LEFT; break;
        case 'right': targetDirection = DIRECTIONS.RIGHT; break;
        case 'upLeft': targetDirection = DIRECTIONS.UP_LEFT; break;
        case 'upRight': targetDirection = DIRECTIONS.UP_RIGHT; break;
        case 'downLeft': targetDirection = DIRECTIONS.DOWN_LEFT; break;
        case 'downRight': targetDirection = DIRECTIONS.DOWN_RIGHT; break;
        default: targetDirection = null;
      }
      
      if (targetDirection) {
        console.log(`NotHereBot: Moviendo en dirección: ${targetDirection}`);
        startDirectionalMovement(targetDirection);
        sendResponse({ 
          success: true, 
          isRunning: true, 
          currentDirection: targetDirection 
        });
      } else {
        console.error(`NotHereBot: Dirección no reconocida: ${direction}`);
        sendResponse({ 
          success: false, 
          error: 'Dirección no válida' 
        });
      }
    }
    return true;
  }
  
  // Para obtener el estado actual del bot
  if (message.action === 'getStatus') {
    sendResponse({ 
      isRunning, 
      currentDirection 
    });
    return true;
  }
});

// Esperar a que el juego cargue completamente
setTimeout(() => {
  console.log('NotHereBot: Listo para usar. Presiona cualquier dirección para comenzar a moverte.');
}, 2000);
