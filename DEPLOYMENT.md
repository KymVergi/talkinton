# 🚀 Guía de Despliegue - Talking Tom Next.js

Esta guía te ayudará a desplegar tu aplicación en diferentes plataformas.

## 📋 Requisitos previos

- Node.js 18.17 o superior
- npm o yarn
- Cuenta en la plataforma de despliegue elegida

## 🌐 Opciones de despliegue

### Opción 1: Vercel (Recomendado)

Vercel es la plataforma creada por los desarrolladores de Next.js. Es la forma más fácil de desplegar.

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub, GitLab o Bitbucket

2. **Conectar repositorio**
   - Sube tu proyecto a GitHub
   - En Vercel, haz clic en "New Project"
   - Importa tu repositorio

3. **Configurar proyecto**
   - Vercel detectará automáticamente Next.js
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Desplegar**
   - Haz clic en "Deploy"
   - ¡Tu sitio estará listo en minutos!

**URL:** `https://tu-proyecto.vercel.app`

### Opción 2: Netlify

1. **Crear cuenta en Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate con GitHub

2. **Configuración**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Desplegar**
   - Conecta tu repositorio de GitHub
   - Netlify desplegará automáticamente

### Opción 3: Servidor propio (VPS)

1. **Conectar al servidor vía SSH**
   ```bash
   ssh usuario@tu-servidor.com
   ```

2. **Instalar Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clonar proyecto**
   ```bash
   git clone tu-repositorio.git
   cd talking-tom-nextjs
   ```

4. **Instalar dependencias**
   ```bash
   npm install
   ```

5. **Compilar para producción**
   ```bash
   npm run build
   ```

6. **Instalar PM2 para mantener la app corriendo**
   ```bash
   npm install -g pm2
   pm2 start npm --name "talking-tom" -- start
   pm2 save
   pm2 startup
   ```

7. **Configurar Nginx como proxy reverso**
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Configurar SSL con Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d tu-dominio.com
   ```

### Opción 4: Docker

1. **Crear Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Construir imagen**
   ```bash
   docker build -t talking-tom-nextjs .
   ```

3. **Ejecutar contenedor**
   ```bash
   docker run -p 3000:3000 talking-tom-nextjs
   ```

## 🔧 Variables de entorno

Si necesitas agregar variables de entorno, crea un archivo `.env.local`:

```env
# Ejemplo
NEXT_PUBLIC_API_URL=https://api.ejemplo.com
```

## ✅ Verificación post-despliegue

1. **Verifica que el sitio carga**
   - Abre la URL de tu sitio
   - Comprueba que no hay errores en la consola

2. **Prueba la funcionalidad de voz**
   - Ve a la página /chat
   - Otorga permisos de micrófono
   - Prueba hablar con Tom

3. **Verifica en diferentes navegadores**
   - Chrome/Edge (mejor soporte)
   - Safari
   - Firefox

## 📊 Monitoreo

Para Vercel:
- Ve al Dashboard → Analytics
- Revisa métricas de rendimiento
- Configura alertas si es necesario

Para servidor propio:
- Usa PM2 para logs: `pm2 logs talking-tom`
- Monitorea con: `pm2 monit`

## 🐛 Solución de problemas

### El micrófono no funciona
- Verifica que el sitio use HTTPS (requerido para Web Speech API)
- Comprueba permisos del navegador

### Errores de compilación
- Elimina `node_modules` y `.next`
- Ejecuta `npm install` de nuevo
- Vuelve a compilar con `npm run build`

### Problemas de rendimiento
- Verifica que estés en modo producción
- Considera usar CDN para imágenes
- Habilita caché en el servidor

## 📱 Optimización para móviles

La app ya está optimizada para móviles, pero asegúrate de:
- Probar en diferentes dispositivos
- Verificar que el toque funciona correctamente
- Comprobar que las animaciones son fluidas

## 🎉 ¡Listo!

Tu aplicación Talking Tom Next.js está lista para el mundo. ¡Disfruta!

---

**Soporte adicional:**
- Documentación Next.js: https://nextjs.org/docs
- Documentación Vercel: https://vercel.com/docs
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
