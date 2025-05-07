# NotHere AutoMover

<p align="center">
  <img src="icon128.png" alt="NotHere AutoMover Logo" width="128" height="128">
</p>

Una extensión para Chrome/Edge que automatiza el movimiento en el juego web [NO THERE, THERE](https://demo.nothere.life/demo/index.html), enviando eventos de teclado directamente al canvas del juego.

## ✨ Características

- **Automatización inteligente**: Envía eventos de teclado directamente al elemento canvas
- **Alto rendimiento**: Movimiento automatizado a máxima velocidad para todas las direcciones
- **Movimiento diagonal fluido**: Las direcciones diagonales alternan rápidamente entre sus teclas componentes
- **Interfaz sencilla**: Control intuitivo con botones de dirección
- **Código abierto**: Personaliza la extensión según tus necesidades

## 📥 Instalación

### Desde GitHub
1. Clona este repositorio o descarga el ZIP
   ```
   git clone https://github.com/tu-usuario/NotHereBot.git
   ```
2. Abre Chrome/Edge y navega a `chrome://extensions` o `edge://extensions`
3. Activa el "Modo desarrollador" (esquina superior derecha)
4. Haz clic en "Cargar descomprimida" y selecciona la carpeta del proyecto
5. ¡Listo! La extensión aparecerá en tu barra de herramientas

## 🎮 Uso

1. Visita el [juego NOT HERE, THERE](https://demo.nothere.life/demo/index.html)
2. Haz clic en el icono de la extensión para mostrar el popup
3. Selecciona una dirección de movimiento:
   - **Direcciones cardinales**: Arriba, Abajo, Izquierda, Derecha
   - **Diagonales**: Noreste (NE), Noroeste (NO), Sureste (SE), Suroeste (SO)
4. Para detener el movimiento, haz clic en el botón de pausa central que aparece

### Control desde consola

También puedes controlar el bot desde la consola del navegador:

```javascript
// Mover en diferentes direcciones
NotHereBot.moveUp()
NotHereBot.moveDown()
NotHereBot.moveLeft()
NotHereBot.moveRight()
NotHereBot.moveUpLeft()
NotHereBot.moveUpRight()
NotHereBot.moveDownLeft()
NotHereBot.moveDownRight()

// Detener el bot
NotHereBot.stop()
```

## 🛠️ Estructura del proyecto

```
NotHereBot/
├── manifest.json       # Configuración de la extensión
├── content.js          # Script que se inyecta en la página
├── background.js       # Script de fondo
├── popup.html          # Interfaz de usuario
├── popup.js            # Lógica del popup
├── icon16.png          # Iconos en diferentes tamaños
├── icon48.png
└── icon128.png
```

## 📋 Notas técnicas

- La extensión utiliza `KeyboardEvent` para simular pulsaciones de teclas
- Se incluyen propiedades como `bubbles`, `cancelable` y `view: window` para asegurar que el juego los reconozca
- Las diagonales alternan rápidamente entre sus teclas componentes para emular movimiento diagonal fluido

## 🤝 Contribuciones

Las contribuciones son bienvenidas:
1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/mejora-increible`)
3. Haz commit de tus cambios (`git commit -m 'Añade mejora increíble'`)
4. Sube la rama (`git push origin feature/mejora-increible`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está disponible como código abierto bajo los términos de la licencia MIT.

## 📝 Historial de versiones

- **v1.0.0** - Versión inicial con movimiento automático
- **v1.1.0** - Mejoras de velocidad y soporte para diagonales
- **v2.0.0** - Simplificación de la interfaz e integración de alto rendimiento por defecto 