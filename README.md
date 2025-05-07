# NotHere AutoMover

<p align="center">
  <img src="icon128.png" alt="NotHere AutoMover Logo" width="128" height="128">
</p>

Una extensión para Chrome/Edge que automatiza el movimiento en el juego web [NO THERE, THERE](https://demo.nothere.life/demo/index.html), enviando eventos de teclado directamente al canvas del juego.

## ✨ Características

- **Automatización inteligente**: Envía eventos de teclado directamente al elemento canvas
- **Dos modos de velocidad**: 
  - Normal: Movimiento automatizado a velocidad moderada
  - Turbo: Máxima velocidad para un avance rápido
- **Interfaz sencilla**: Control desde popup o consola del navegador
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
3. Opciones disponibles:
   - **Iniciar Bot**: Comienza el movimiento automático a velocidad normal
   - **Modo Turbo**: Activa el movimiento a máxima velocidad
   - **Detener**: Para el bot cuando esté activo

### Control desde consola

También puedes controlar el bot desde la consola del navegador:

```javascript
// Iniciar a velocidad normal
NotHereBot.start()

// Iniciar a máxima velocidad
NotHereBot.turbo()

// Detener el bot
NotHereBot.stop()

// Alternar entre iniciar/detener
NotHereBot.toggle()
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
- Modo turbo envía múltiples teclas en secuencia muy rápida para máximo rendimiento

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
- **v1.1.0** - Añadido modo turbo y mejoras de velocidad 