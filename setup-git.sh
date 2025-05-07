#!/bin/bash

# Script para inicializar y configurar el repositorio Git de NotHereBot

# Colores para la salida
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # Sin Color

echo -e "${BLUE}=== Configurando repositorio Git para NotHereBot ===${NC}"

# Inicializar repositorio Git si no existe
if [ ! -d .git ]; then
  echo -e "${GREEN}Inicializando repositorio Git...${NC}"
  git init
else
  echo -e "${GREEN}Repositorio Git ya está inicializado.${NC}"
fi

# Verificar si README-github.md existe y renombrarlo a README.md
if [ -f README-github.md ]; then
  echo -e "${GREEN}Renombrando README-github.md a README.md...${NC}"
  # Si ya existe un README.md, hacer backup
  if [ -f README.md ]; then
    mv README.md README.md.bak
    echo -e "${BLUE}Se ha creado una copia de seguridad del README.md anterior como README.md.bak${NC}"
  fi
  mv README-github.md README.md
fi

# Añadir archivos al staging
echo -e "${GREEN}Añadiendo archivos al staging...${NC}"
git add manifest.json content.js background.js popup.html popup.js .gitignore README.md LICENSE 
# Añadir iconos si existen
if [ -f icon16.png ]; then
  git add icon16.png
fi
if [ -f icon48.png ]; then
  git add icon48.png
fi
if [ -f icon128.png ]; then
  git add icon128.png
fi

# Crear el primer commit
echo -e "${GREEN}Creando commit inicial...${NC}"
git commit -m "Versión inicial de NotHereBot v1.1.0"

# Instrucciones para conectar con GitHub
echo -e "\n${BLUE}=== Próximos pasos ===${NC}"
echo -e "1. Crea un repositorio en GitHub (no inicialices con README)"
echo -e "2. Conecta tu repositorio local con el remoto:"
echo -e "${GREEN}   git remote add origin https://github.com/tu-usuario/NotHereBot.git${NC}"
echo -e "3. Sube tu código a GitHub:"
echo -e "${GREEN}   git push -u origin master${NC} (o ${GREEN}git push -u origin main${NC})"
echo -e "\n${BLUE}¡Tu repositorio Git está listo!${NC}" 