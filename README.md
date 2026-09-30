# Museo Web

Página estática para el Museo Municipal "19 de Diciembre", Caimanera.

📖 **[Documentación completa del proyecto](./DOCUMENTACION.md)**

---

## Descripción

Sitio web con las salas, secciones, contactos e información general del museo. Diseñado para cargar rápido incluso en conexiones lentas.

## Stack

- **Astro 7.3.5** — framework web orientado a contenido estático
- **Node.js 22** — runtime de JavaScript
- **TypeScript** — tipado estático
- **GitHub Pages** — hosting gratuito

## Instalación rápida

```bash
# Clonar el repositorio
git clone https://github.com/creafter770/museo-web.git
cd museo-web

# Instalar dependencias
npm install

# Arrancar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.

## Estructura del proyecto

```text
museo-web/
├── public/                  # Archivos estáticos (imágenes)
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── content/             # Contenido en Markdown
│   ├── layouts/             # Plantillas base
│   ├── pages/               # Rutas del sitio
│   ├── styles/              # CSS global
│   └── content.config.ts    # Definición de colecciones
└── package.json
```

## Comandos disponibles

| Comando           | Acción                              |
|-------------------|-------------------------------------|
| `npm install`     | Instala dependencias                |
| `npm run dev`     | Servidor local en `localhost:4321`  |
| `npm run build`   | Genera el sitio estático en `dist/` |
| `npm run preview` | Previsualiza el build localmente    |

## Licencia

MIT — ver [LICENSE](./LICENSE)