# 🎯 Características del Proyecto - Talking Tom Next.js

## 📱 Descripción General

Una aplicación web moderna que recrea la experiencia de My Talking Tom en el navegador, con diseño inspirado en https://mytalkingtom.com/gameplay. Incluye reconocimiento de voz, síntesis de voz multiidioma y una interfaz visualmente atractiva con grandes bloques de colores.

## ✨ Características Principales

### 🎨 Diseño Visual
- **Estilo My Talking Tom**: Grandes cajas de colores vibrantes (púrpura, azul, rosa, navy)
- **Animaciones suaves**: Usando Framer Motion para transiciones elegantes
- **Diseño responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- **Fuentes personalizadas**: 
  - Fredoka para títulos (estilo juguetón)
  - Outfit para cuerpo de texto (moderna y legible)

### 🗣️ Funcionalidad de Voz

#### Reconocimiento de Voz (Speech Recognition)
- Captura el audio del usuario a través del micrófono
- Convierte voz a texto en tiempo real
- Soporte para múltiples idiomas
- Compatible con Web Speech API

#### Síntesis de Voz (Text-to-Speech)
- Tom responde con voz sintetizada
- Voz en tono alto característico de Tom (pitch: 1.5)
- Soporte para más de 50 idiomas
- Voces específicas según el sistema operativo

### 🌍 Soporte Multiidioma

La aplicación detecta automáticamente las voces disponibles en el navegador y permite seleccionar entre:
- Español
- Inglés
- Francés
- Alemán
- Italiano
- Portugués
- Chino
- Japonés
- Árabe
- Hindi
- Y muchos más...

### 📄 Páginas Incluidas

1. **Página Principal (/)**: 
   - Hero section con descripción del juego
   - Secciones de características con diseño de cajas grandes
   - Animaciones de entrada con stagger effect
   - Call-to-action para ir al chat

2. **Página de Chat (/chat)**:
   - Interfaz interactiva con Tom
   - Selector de idioma
   - Estados visuales (escuchando, hablando, normal)
   - Visualización de conversación en tiempo real
   - Instrucciones de uso

3. **Página de Gameplay (/gameplay)**:
   - Grid de características
   - Información detallada sobre el juego
   - Diseño con cards coloridas

### 🎭 Estados Visuales de Tom

La aplicación muestra diferentes imágenes de Tom según el estado:

1. **Normal** (`Tom.jpg`): Estado inicial, Tom esperando
2. **Escuchando** (`tom_listening.jpg`): Cuando el micrófono está activo
3. **Hablando** (`tom_talking.gif`): Cuando Tom está respondiendo

### 🎯 Interacciones

- **Click en Tom**: Activa el micrófono para hablar
- **Animación de flotación**: Tom flota suavemente cuando está inactivo
- **Indicadores visuales**: Badges que muestran el estado actual
- **Hover effects**: Elementos interactivos responden al mouse
- **Transiciones suaves**: Entre todos los estados

## 🛠️ Tecnologías Utilizadas

### Framework y Librerías
- **Next.js 14**: Framework de React con App Router
- **React 18**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Framer Motion 11**: Animaciones y transiciones
- **Tailwind CSS 3**: Estilos utility-first

### APIs del Navegador
- **Web Speech API - SpeechRecognition**: Para capturar voz
- **Web Speech API - SpeechSynthesis**: Para generar voz
- **MediaDevices API**: Para acceso al micrófono

### Configuración
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad cross-browser
- **ESLint**: Linting de código

## 📁 Estructura de Archivos

```
talking-tom-nextjs/
├── app/
│   ├── chat/
│   │   └── page.tsx           # Página de chat interactivo
│   ├── gameplay/
│   │   └── page.tsx           # Página de gameplay
│   ├── globals.css            # Estilos globales + fuentes
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página de inicio
├── public/
│   └── images/
│       ├── Tom.jpg            # Tom normal
│       ├── tom_listening.jpg  # Tom escuchando
│       └── tom_talking.gif    # Tom hablando
├── next.config.js             # Configuración Next.js
├── tailwind.config.js         # Configuración Tailwind
├── tsconfig.json              # Configuración TypeScript
├── package.json               # Dependencias
├── README.md                  # Documentación principal
├── DEPLOYMENT.md              # Guía de despliegue
└── setup.sh                   # Script de instalación
```

## 🎨 Paleta de Colores

```css
--color-purple: #9747FF  /* Degradado púrpura */
--color-blue: #00C3FF    /* Degradado azul */
--color-pink: #FF2D92    /* Degradado rosa */
--color-navy: #2B2842    /* Fondo oscuro */
--color-light: #F5F5F7   /* Fondo claro */
```

## 🚀 Cómo Funciona

### Flujo de Conversación

1. Usuario toca la imagen de Tom
2. Se activa el reconocimiento de voz
3. Tom cambia a imagen "escuchando"
4. Usuario habla al micrófono
5. Voz se convierte a texto
6. Sistema genera respuesta
7. Tom cambia a imagen "hablando"
8. Síntesis de voz reproduce la respuesta
9. Tom vuelve al estado normal

### Sistema de Respuestas

Actualmente usa un sistema simple de respuestas aleatorias:
- "¡Hola! ¿Cómo estás?"
- "¡Eso suena genial!"
- "¡Qué interesante!"
- "¡Cuéntame más!"
- "¡Me encanta hablar contigo!"
- "¡Eres muy divertido!"
- "¡Wow, eso es increíble!"

**Nota**: Este sistema puede integrarse fácilmente con APIs de IA como:
- OpenAI GPT
- Anthropic Claude
- Google Dialogflow
- IBM Watson
- DialogFlow

## 🔒 Seguridad y Permisos

### Permisos Requeridos
- **Micrófono**: Para capturar la voz del usuario
- **HTTPS**: Obligatorio para Web Speech API en producción

### Privacidad
- No se almacenan grabaciones de audio
- La transcripción se procesa en el navegador
- No se envían datos a servidores externos (en la implementación actual)

## 📊 Compatibilidad de Navegadores

### Reconocimiento de Voz
✅ Chrome/Edge (Chromium)
✅ Safari 14.1+
❌ Firefox (soporte limitado)

### Síntesis de Voz
✅ Chrome/Edge
✅ Safari
✅ Firefox
✅ Opera

## 🎯 Mejoras Futuras Sugeridas

### Funcionalidad
- [ ] Integración con API de IA para respuestas más inteligentes
- [ ] Sistema de memoria para recordar conversaciones
- [ ] Mini-juegos interactivos
- [ ] Sistema de logros y recompensas
- [ ] Personalización de apariencia de Tom

### Técnico
- [ ] Progressive Web App (PWA)
- [ ] Modo offline
- [ ] Caché de voces
- [ ] Análisis de sentimientos
- [ ] Base de datos para guardar progreso

### UX/UI
- [ ] Tutorial interactivo
- [ ] Más animaciones de Tom
- [ ] Efectos de sonido
- [ ] Temas personalizables
- [ ] Modo oscuro

## 📝 Notas de Desarrollo

### Lógica de Reconocimiento de Voz
El sistema utiliza `SpeechRecognition` del navegador que:
- Solo funciona con HTTPS (excepto en localhost)
- Requiere permisos explícitos del usuario
- Puede tener limitaciones de tiempo de escucha
- La calidad depende del micrófono y ruido ambiental

### Síntesis de Voz
Las voces disponibles dependen de:
- Sistema operativo (Windows, macOS, iOS, Android, Linux)
- Navegador utilizado
- Idioma del sistema
- Voces instaladas

### Performance
- Las imágenes están optimizadas para web
- Las animaciones usan GPU acceleration
- React optimiza re-renders automáticamente
- Next.js proporciona code splitting automático

## 🤝 Integración con APIs Externas

### Ejemplo de integración con OpenAI

```typescript
const handleUserSpeech = async (text: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });
  
  const data = await response.json();
  setTomText(data.reply);
  speakText(data.reply);
};
```

### Ejemplo de API Route (app/api/chat/route.ts)

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();
  
  // Integrar con OpenAI, Claude, etc.
  const reply = await getAIResponse(message);
  
  return NextResponse.json({ reply });
}
```

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Desarrollado con ❤️ usando Next.js y Web Speech API
