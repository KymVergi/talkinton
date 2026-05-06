#!/bin/bash

echo "🎤 Talking Tom Next.js - Instalación y configuración"
echo "=================================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Instalación completada!"
    echo ""
    echo "🚀 Para iniciar el servidor de desarrollo, ejecuta:"
    echo "   npm run dev"
    echo ""
    echo "🌐 Luego abre http://localhost:3000 en tu navegador"
    echo ""
    echo "📝 Comandos disponibles:"
    echo "   npm run dev   - Servidor de desarrollo"
    echo "   npm run build - Compilar para producción"
    echo "   npm start     - Servidor de producción"
    echo ""
else
    echo ""
    echo "❌ Error durante la instalación"
    echo "   Por favor revisa los errores arriba"
    exit 1
fi
