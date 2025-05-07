// Este script genera los iconos necesarios
// Puedes ejecutarlo en Node.js con la librería canvas o en un navegador

// Función para generar un ícono
function generateIcon(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Fondo
  ctx.fillStyle = '#4285f4';
  ctx.fillRect(0, 0, size, size);
  
  // Círculo central
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/3, 0, Math.PI * 2);
  ctx.fill();
  
  // Flecha
  ctx.fillStyle = '#4285f4';
  const arrowSize = size/4;
  
  // Triángulo (flecha)
  ctx.beginPath();
  ctx.moveTo(size/2, size/2 - arrowSize);
  ctx.lineTo(size/2 + arrowSize, size/2);
  ctx.lineTo(size/2, size/2 + arrowSize);
  ctx.closePath();
  ctx.fill();
  
  return canvas.toDataURL("image/png");
}

// Nota: Para crear los íconos reales, puedes:
// 1. Ejecutar estas funciones en el navegador y guardar las imágenes resultantes
// 2. Usar bibliotecas como canvas en Node.js
// 3. O simplemente usar cualquier editor de imágenes para crear íconos personalizados

/*
Para crear los iconos en el navegador:

1. Abre la consola del navegador
2. Copia y pega esta función
3. Ejecuta:
   
   const icon16 = generateIcon(16);
   const icon48 = generateIcon(48);
   const icon128 = generateIcon(128);
   
   // Para ver el ícono:
   console.log(icon16);
   
   // Para descargar (crear un enlace temporal):
   const a = document.createElement('a');
   a.href = icon16;
   a.download = 'icon16.png';
   a.click();
   
   // Repite para los otros tamaños
*/ 