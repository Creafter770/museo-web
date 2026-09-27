# Documentación del Proyecto Museo Web

**Autor:** Creater770
**Repositorio:** https://github.com/Creater770/museo-web
**Descripción:** Página estática para el Museo Municipal "19 de Diciembre", Caimanera.
**Stack:** Astro 7.3.5 + Node.js 22 + TypeScript + Git + GitHub Pages
**Fecha de inicio:** Septiembre 25/2026

---

## Índice

1. [Introducción](#1-introducción)
2. [Entorno de desarrollo](#2-entorno-de-desarrollo)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Arquitectura: cómo se conecta todo](#4-arquitectura-cómo-se-conecta-todo)
5. [Documentación de archivos](#5-documentación-de-archivos)
6. [Sintaxis de Astro](#6-sintaxis-de-astro)
7. [Flujo de trabajo con Git](#7-flujo-de-trabajo-con-git)
8. [Despliegue en GitHub Pages](#8-despliegue-en-github-pages)
9. [Solución de problemas](#9-solución-de-problemas)
10. [Notas para el contexto cubano](#10-notas-para-el-contexto-cubano)
11. [Anexos](#11-anexos)

---

## 1. Introducción

### 1.1 Propósito del proyecto

Sitio web estático que documenta las salas, secciones, contactos e información general del Museo Municipal "19 de Diciembre" de Caimanera. El objetivo es ofrecer una experiencia informativa, visual y accesible incluso en conexiones lentas.

### 1.2 ¿Por qué Astro?

Astro es un framework web orientado al contenido que genera HTML estático. Sus ventajas:

- **Cero JavaScript por defecto:** el navegador no ejecuta código innecesario.
- **Rápido en conexiones lentas:** ideal para el contexto cubano.
- **Hosting gratuito:** se puede alojar en GitHub Pages, Netlify o cualquier servidor estático.
- **Content Collections:** permite escribir contenido en Markdown y validarlo con esquemas.
- **Componentes reutilizables:** mantiene el código limpio y escalable.

### 1.3 Conceptos previos

- **Markdown (`.md`):** lenguaje de marcado ligero para escribir contenido con formato.
- **Frontmatter:** bloque entre `---` al inicio de un `.md` con datos estructurados (título, imagen, etc.).
- **Componente:** pieza reutilizable de UI (archivo `.astro`).
- **Layout:** plantilla que envuelve páginas con estructura común (header, footer).
- **Colección:** grupo de archivos `.md` con la misma estructura.

---

## 2. Entorno de desarrollo

### 2.1 Requisitos

| Herramienta | Versión | Propósito            |
|-------------|---------|----------------------|
| Linux Mint  | 21+     | Sistema operativo    |
| Node.js     | 22.x    | Runtime de JavaScript|
| npm         | 10.x+   | Gestor de paquetes   |
| Git         | 2.x     | Control de versiones |
| VS Code     | Última  | Editor de código     |
| Astro       | 7.3.5   | Framework web        |

### 2.2 Instalación de Node.js 22 (método NVM)

Debido a que los repositorios de Linux Mint incluyen Node.js 18 (obsoleto para Astro 7), se instala mediante NVM:

```bash
# Instalar dependencias previas
sudo apt update
sudo apt install -y curl build-essential

# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash

# Recargar configuración de la terminal
source ~/.bashrc

# Instalar Node.js 22
nvm install 22
nvm alias default 22

# Verificar
node -v   # v22.x.x
npm -v    # 10.x.x
```

### 2.3 Extensiones de VS Code recomendadas

| Extensión        | Función                                 |
|------------------|-----------------------------------------|
| Astro            | Resaltado y autocompletado en `.astro`  |
| Prettier         | Formateo automático de código           |
| ESLint           | Detección de errores                    |
| GitLens          | Información de Git en el editor         |
| Error Lens       | Errores visibles junto a la línea       |
| Auto Rename Tag  | Renombrado automático de etiquetas HTML |
| Path Intellisense| Autocompletado de rutas de archivos     |
| Better Comments  | Comentarios con colores                 |
| TODO Tree        | Panel con tareas pendientes             |
| Git Graph        | Visualización del historial de Git      |

### 2.4 Crear el proyecto

```bash
cd ~/Proyectos
npm create astro@latest
# - Nombre: museo-web
# - Plantilla: Empty
# - Instalar dependencias: Yes
# - Inicializar Git: Yes
# - TypeScript: Yes
```

### 2.5 Configuración de npm para Cuba

El registro oficial de npm está bloqueado. Se usa un mirror alternativo:

```bash
npm config set registry https://mirrors.cloud.tencent.com/npm/
npm config set fetch-retry-maxtimeout 600000
npm config set fetch-timeout 600000
```

Verificar: `npm config get registry`

---

## 3. Estructura del proyecto

```
museo-web/
├── public/                      # Archivos estáticos (imágenes, favicon)
│   └── imagenes/
│       ├── salas/
│       └── contactos/
├── src/
│   ├── components/              # Componentes reutilizables
│   │   └── Card.astro           # Tarjeta de sala/contacto
│   ├── content/                 # Contenido en Markdown
│   │   ├── salas/
│   │   │   ├── sala1.md
│   │   │   └── sala2.md
│   │   └── contactos/
│   │       ├── director.md
│   │       └── institucion.md
│   ├── layouts/                 # Plantillas base
│   │   └── BaseLayout.astro
│   ├── pages/                   # Rutas del sitio
│   │   ├── index.astro          # /
│   │   ├── salas/
│   │   │   ├── index.astro      # /salas
│   │   │   └── [slug].astro     # /salas/:id
│   │   └── contactos/
│   │       ├── index.astro      # /contactos
│   │       └── [slug].astro     # /contactos/:id
│   ├── styles/
│   │   └── global.css           # CSS global
│   └── content.config.ts        # Definición de colecciones
├── .gitignore
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── LICENSE
├── README.md
└── DOCUMENTACION.md
```

**Reglas fundamentales:**

- Los `.md` son **datos**.
- Los `.astro` son **plantillas**.
- Los `.ts` son **reglas de validación**.
- Los archivos en `public/` se sirven sin procesar.
- Todo lo que va en `pages/` genera una URL.

---

## 4. Arquitectura: cómo se conecta todo

### 4.1 La cadena de datos

```
┌─────────────────────────────────────────────────────┐
│  src/content.config.ts                              │
│  → Declara dónde viven los .md y qué campos tienen  │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  src/content/<coleccion>/*.md                       │
│  → Contenido real: frontmatter + cuerpo Markdown    │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ getCollection('nombre')
                       ▼
┌─────────────────────────────────────────────────────┐
│  Array de entradas: [{id, data, body}, ...]         │
└──────────────────────┬──────────────────────────────┘
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
┌────────────────────┐        ┌────────────────────┐
│ index.astro        │        │ [slug].astro       │
│ Lista todas        │        │ Detalle por id     │
│ .map() + Card      │        │ getStaticPaths()   │
│                    │        │ render()           │
└─────────┬──────────┘        └─────────┬──────────┘
          │                             │
          └──────────────┬──────────────┘
                         ▼
              ┌─────────────────────┐
              │ BaseLayout.astro    │
              │ <slot />            │
              └──────────┬──────────┘
                         ▼
                 HTML estático final
                 + CSS global + CSS scoped
```

### 4.2 Los tres eslabones clave

**Eslabón 1 — `content.config.ts`**

```typescript
loader: glob({ pattern: '**/*.md', base: './src/content/salas' })
```

**Esta es la única línea del proyecto que sabe dónde están los `.md`.** Si mueves la carpeta, solo cambias aquí.

**Eslabón 2 — `getCollection('salas')`**

Las páginas nunca tocan el sistema de archivos. Piden al sistema por el **nombre lógico** de la colección.

**Eslabón 3 — `getStaticPaths()`**

Genera una ruta por cada entrada. El **nombre del archivo** se convierte en el **`id`**, y el `id` en la URL.

- `sala1.md` → `/salas/sala1`
- `director.md` → `/contactos/director`

### 4.3 Regla del `slug` vs `id`

- En Astro 4 y anteriores, se usaba `entry.slug`.
- En Astro 5+ (incluido 7), se usa `entry.id`.

El `id` es el nombre del archivo sin extensión. Se usa tanto para las URLs como para las referencias entre colecciones.

### 4.4 Sintaxis de componentes y layouts

**Regla de la mayúscula inicial:**
- `<Card />` → componente (importado).
- `<div>` → elemento HTML estándar.

**Regla de rutas relativas:**
- Cuenta cuántas carpetas hay entre tu archivo y `src/`. Cada carpeta es un `../`.
- Desde `src/pages/salas/index.astro` → `../../layouts/`.
- Desde `src/pages/index.astro` → `../layouts/`.

---

## 5. Documentación de archivos

### 5.1 `src/content.config.ts`

**Propósito:** Definir las colecciones de contenido y sus esquemas de validación.

**Código completo:**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const salas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/salas' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagen_principal: z.string(),
  }),
});

const contactos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contactos' }),
  schema: z.object({
    nombre: z.string(),
    bio: z.string(),
    foto: z.string(),
    telefono: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const collections = { salas, contactos };
```

**Explicación línea por línea:**

| Línea                                 | Qué hace                                            |
|---------------------------------------|-----------------------------------------------------|
|`import { defineCollection, z }`       | Importa el creador de colecciones y el validador Zod|
|`import { glob }`                      | Importa el cargador de archivos por patrón          |
|`const salas = defineCollection({...})`| Crea la colección `salas`                           |
|`loader: glob({...})`                  | Le dice dónde buscar los archivos                   |
|`pattern: '**/*.md'`                   | Filtro: cualquier `.md` en cualquier subcarpeta     |
|`base: './src/content/salas'`          | Carpeta raíz de búsqueda                            |
|`schema: z.object({...})`              | Define los campos obligatorios/opcionales           |
|`z.string()`                           | Campo obligatorio de tipo texto                     |
|`.optional()`                          | Campo opcional                                      |
|`export const collections = {...}`     | Expone las colecciones al resto del proyecto        |

**Cómo añadir una nueva colección:**

1. Añadir el `defineCollection` correspondiente.
2. Añadirlo al `export const collections`.

### 5.2 `src/layouts/BaseLayout.astro`

**Propósito:** Plantilla HTML común a todas las páginas.

**Props:**
- `title: string` — el título de la página.

**Código:**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | Museo Local</title>
  </head>
  <body>
    <header>
      <nav>
        <a href="/">Inicio</a>
        <a href="/salas">Salas</a>
        <a href="/contactos">Contactos</a>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>&copy; 2026 Museo Local</p>
    </footer>
  </body>
</html>
```

**Puntos clave:**
- `<slot />` es el hueco donde se inyecta el contenido de cada página.
- El CSS global se importa una sola vez aquí.
- Si cambias el nav, todas las páginas lo reflejan automáticamente.

### 5.3 `src/components/Card.astro`

**Propósito:** Tarjeta reutilizable para mostrar salas o contactos en un listado.

**Props:**
- `titulo: string` (obligatorio)
- `descripcion: string` (obligatorio)
- `imagen?: string` (opcional)
- `href: string` (obligatorio)

**Código:**

```astro
---
interface Props {
  titulo: string;
  descripcion: string;
  imagen?: string;
  href: string;
}
const { titulo, descripcion, imagen, href } = Astro.props;
---
<a href={href} class="card">
  {imagen && <img src={imagen} alt={titulo} />}
  <div class="card-contenido">
    <h3>{titulo}</h3>
    <p>{descripcion}</p>
  </div>
</a>

<style>
  .card {
    display: block;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .card-contenido {
    padding: 1rem;
  }
  .card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  .card p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }
</style>
```

**Puntos clave:**
- `{imagen && <img ... />}` es renderizado condicional.
- Los estilos dentro de `<style>` están scoped (aislados al componente).
- El elemento es un `<a>` completo, mejor para móviles.

### 5.4 `src/pages/index.astro`

**Propósito:** Página de inicio.

**URL:** `/`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Inicio">
  <h1>Bienvenido al Museo Local</h1>
  <p>Explora nuestras salas y conoce a nuestros contactos.</p>
  <ul>
    <li><a href="/salas">Ver todas las salas</a></li>
    <li><a href="/contactos">Ver todos los contactos</a></li>
  </ul>
</BaseLayout>
```

### 5.5 `src/pages/salas/index.astro`

**Propósito:** Listado de todas las salas en formato de tarjetas.

**URL:** `/salas`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Card from '../../components/Card.astro';

const salas = await getCollection('salas');
---
<BaseLayout title="Salas">
  <h1>Nuestras Salas</h1>
  <div class="grid">
    {salas.map((sala) => (
      <Card
        titulo={sala.data.titulo}
        descripcion={sala.data.descripcion}
        imagen={sala.data.imagen_principal}
        href={`/salas/${sala.id}`}
      />
    ))}
  </div>
</BaseLayout>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
```

### 5.6 `src/pages/salas/[slug].astro`

**Propósito:** Página individual de cada sala.

**URL:** `/salas/:id`

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const salas = await getCollection('salas');
  return salas.map((sala) => ({
    params: { slug: sala.id },
    props: { sala },
  }));
}

const { sala } = Astro.props;
const { Content } = await render(sala);
---
<BaseLayout title={sala.data.titulo}>
  <article>
    <p><a href="/salas">← Volver a salas</a></p>
    <h1>{sala.data.titulo}</h1>
    <img src={sala.data.imagen_principal} alt={sala.data.titulo} class="portada" />
    <p>{sala.data.descripcion}</p>
    <Content />
  </article>
</BaseLayout>

<style>
  .portada {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
</style>
```

### 5.7 `src/pages/contactos/index.astro` y `[slug].astro`

Mismos patrones que las salas, adaptados a la colección `contactos`.

### 5.8 `src/content/salas/*.md`

**Ejemplo de frontmatter:**

```markdown
---
titulo: "Sala de Historia"
descripcion: "Recorre los primeros años del museo."
imagen_principal: "/imagenes/salas/historia.jpg"
---

## Introducción

Texto de la sala en Markdown...
```

**Reglas de nomenclatura:**

- Minúsculas.
- Sin espacios (usar `-`).
- Sin acentos ni `ñ`.
- Sin caracteres especiales.

| ✅ Correcto         | ❌ Incorrecto       |
|---------------------|---------------------|
| `sala-historia.md`  | `SalaHistoria.md`   |
| `juan-perez.md`     | `Juan Pérez.md`     |
| `fauna-acuatica.md` | `fauna_acuática.md` |

**El nombre del archivo define la URL:**
- `sala-historia.md` → `/salas/sala-historia`

### 5.9 `src/styles/global.css`

**Propósito:** Estilos globales (body, tipografía, header, footer).

**Importado en:** `BaseLayout.astro`.

**Contiene:** variables CSS, reset de márgenes, tipografía base, estilos de header/footer/main.

---

## 6. Sintaxis de Astro

### 6.1 Estructura de un archivo `.astro`

```astro
---
// Bloque 1: frontmatter (se ejecuta en el servidor)
import Componente from '../components/Componente.astro';
const variable = 'valor';
---

<!-- Bloque 2: template (HTML + expresiones) -->
<div>{variable}</div>

<style>
  /* Bloque 3: estilos scoped */
</style>
```

### 6.2 Expresiones con llaves `{}`

| Sintaxis                      | Significado                            |
|-------------------------------|----------------------------------------|
| `{variable}`                  | Muestra el valor                       |
| `{2 + 2}`                     | Operación matemática                   |
| `{objeto.propiedad}`          | Acceso a propiedad                     |
| `{array.map(...)}`            | Renderiza una lista                    |
| `{condicion && <p>...</p>}`   | Renderiza si la condición es verdadera |
| `{condicion ? <A /> : <B />}` | Renderiza A o B según la condición     |

### 6.3 Componentes vs HTML

- `<Card />` → componente (mayúscula inicial, importado).
- `<div>` → elemento HTML estándar.

### 6.4 Props

```astro
<!-- Estáticas -->
<Card titulo="Hola" />

<!-- Dinámicas -->
<Card titulo={variable} />

<!-- Con template literal -->
<Card titulo={`${a} ${b}`} />
```

### 6.5 Imports relativos

Desde `src/pages/salas/index.astro`:

- `../../layouts/BaseLayout.astro` → sube 2 niveles hasta `src/`.
- `../../components/Card.astro` → sube 2 niveles.

**Regla:** cuenta cuántas carpetas hay entre tu archivo y `src/`. Cada carpeta es un `../`.

### 6.6 Rutas dinámicas

- `[slug].astro` → `/cualquier-cosa`.
- `[sala]/[seccion].astro` → `/sala/seccion`.
- Requieren `getStaticPaths()`.

### 6.7 `getStaticPaths()`

Función exportada que devuelve un array de rutas:

```typescript
export async function getStaticPaths() {
  const entradas = await getCollection('coleccion');
  return entradas.map((entrada) => ({
    params: { slug: entrada.id },
    props: { entrada },
  }));
}
```

- `params` define los valores de los `[corchetes]` en la ruta.
- `props` pasa datos al template.

### 6.8 Renderizado de Markdown

```typescript
import { render } from 'astro:content';
const { Content } = await render(entrada);
```

- `render(entrada)` convierte el `.body` (Markdown) a un componente.
- `<Content />` lo inserta en el HTML.

---

## 7. Flujo de trabajo con Git

### 7.1 Configuración inicial

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 7.2 Comandos básicos

| Comando | Función |
|---|---|
| `git status` | Ver estado del working directory |
| `git add .` | Preparar todos los cambios |
| `git commit -m "mensaje"` | Guardar un punto de control |
| `git log --oneline` | Ver historial resumido |
| `git branch` | Ver ramas locales |
| `git branch -a` | Ver ramas locales y remotas |

### 7.3 Flujo de ramas

```bash
# Crear rama para nueva funcionalidad
git checkout main
git pull
git checkout -b nueva-funcionalidad

# ... trabajar ...

# Guardar cambios
git add .
git commit -m "Descripción del cambio"

# Fusionar con main
git checkout main
git merge nueva-funcionalidad
git push

# Borrar rama
git branch -d nueva-funcionalidad
git push origin --delete nueva-funcionalidad
```

### 7.4 Deshacer cambios

| Escenario                         | Comando                   |
|-----------------------------------|---------------------------|
| Descartar cambios sin commit      | `git checkout -- archivo` |
| Deshacer commit, mantener cambios | `git reset --soft HEAD~1` |
| Deshacer commit y perder cambios  | `git reset --hard HEAD~1` |
| Guardar cambios temporalmente     | `git stash push -m "msg"` |
| Recuperar cambios guardados       | `git stash pop`           |

### 7.5 Autenticación con GitHub

GitHub ya no acepta contraseñas. Se necesita un **Personal Access Token (PAT)**.

**Crear el token:**

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic).
2. Generate new token (classic).
3. Nombre: `museo-web-push`, Expiración: 90 días, Scope: `repo`.
4. Copiar el token (`ghp_...`) y guardarlo.

**Usarlo en el push:**
- Username: tu usuario de GitHub.
- Password: pega el token.

### 7.6 Conectar repositorio local con GitHub

```bash
# Renombrar rama local a main si es necesario
git branch -M main

# Añadir remoto
git remote add origin https://github.com/Creater770/museo-web.git

# Traer commits del remoto
git fetch origin

# Reaplicar commits locales encima de los remotos
git rebase origin/main

# Subir
git push -u origin main
```

---

## 8. Despliegue en GitHub Pages

### 8.1 Configurar Astro

En `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Creater770.github.io',
  base: '/museo-web',
});
```

### 8.2 Activar GitHub Pages

1. En el repositorio de GitHub: Settings → Pages.
2. Source: **GitHub Actions**.
3. GitHub detecta Astro y configura el workflow automáticamente.

### 8.3 URL final

`https://creater770.github.io/museo-web/`

---

## 9. Solución de problemas

### 9.1 Errores comunes

| Error                          | Causa                                  | Solución                          |
|--------------------------------|----------------------------------------|-----------------------------------|
| `LegacyContentConfigError`     | `content.config.ts` mal ubicado        | Moverlo a `src/content.config.ts` |
| `Could not import X`           | Ruta relativa mal                      | Contar los `../` correctamente    |
| `implicitly has an 'any' type` | Variable no declarada o typo           | Revisar nombre de la variable     |
| 404 en ruta dinámica           | Falta `[slug].astro` o el `.md`        | Verificar archivos                |
| Slot vacío                     | Falta `<slot />` en el Layout          | Añadirlo                          |
| Imagen rota                    | Ruta incorrecta                        | Verificar `public/imagenes/...`   |
| `ENOTFOUND` al instalar        | Registro npm bloqueado                 | Configurar mirror (ver 2.5)       |
| `ETIMEDOUT` en npm             | Conexión inestable                     | Aumentar timeouts                 |

### 9.2 Cambios de API en Astro

Astro 4 → Astro 5+ cambiaron la API de Content Collections. Si un tutorial antiguo no funciona:

- `type: 'content'` → `loader: glob(...)`
- `entry.slug` → `entry.id`
- `await entry.render()` → `render(entry)` (función importada)

**Siempre consultar la documentación oficial de la versión instalada.**

### 9.3 Verificar la versión de Astro

```bash
npm list astro
# o
cat package.json | grep astro
```

### 9.4 El error "cannot find module" tras un rebase

Si tras cambiar de rama un import falla, suele ser porque la rama no tenía ese archivo. Verificar con:

```bash
git status
ls src/components/
```

---

## 10. Notas para el contexto cubano

### 10.1 Mirrors de npm

El registro oficial de npm está bloqueado. Alternativas:

```bash
# Tencent Cloud (recomendado)
npm config set registry https://mirrors.cloud.tencent.com/npm/

# Verificar
npm config get registry
```

### 10.2 Timeouts de red

Si las instalaciones fallan por timeout:

```bash
npm config set fetch-retry-maxtimeout 600000
npm config set fetch-timeout 600000
```

### 10.3 VPN para Git

GitHub es accesible desde Cuba en muchos casos, pero el push puede fallar por inestabilidad. Si ocurre:

1. Activar Proton VPN.
2. Reintentar `git push`.
3. Si tienes proxy configurado en npm, borrarlo para Git: `git config --global --unset http.proxy`.

### 10.4 Optimización de imágenes

Crítico en Cuba por el ancho de banda limitado:

- Convertir a **WebP**.
- Redimensionar a máximo 1600px de ancho.
- Objetivo: menos de 200KB por imagen.
- Usar lazy loading.

### 10.5 GitLens y Cuba

GitLens funciona sin VPN para funciones locales (blame, graph, historial). Para iniciar sesión con GitKraken y usar funciones avanzadas, sí se necesita VPN.

---

## 11. Anexos

### A. Comandos esenciales

```bash
# Desarrollo
npm run dev           # Servidor local en localhost:4321
npm run build         # Generar sitio estático en dist/
npm run preview       # Previsualizar el build

# Git
git status            # Ver cambios
git add .             # Preparar todo
git commit -m "msg"   # Guardar
git push              # Subir al remoto
git pull              # Traer del remoto
```

### B. Estructura de URLs

| Archivo                        | URL              |
|--------------------------------|------------------|
| `pages/index.astro`            | `/`              |
| `pages/salas/index.astro`      | `/salas`         |
| `pages/salas/[slug].astro`     | `/salas/:id`     |
| `pages/contactos/index.astro`  | `/contactos`     |
| `pages/contactos/[slug].astro` | `/contactos/:id` |

### C. Glosario

| Término             | Definición                                        |
|---------------------|---------------------------------------------------|
| **Astro**           | Framework web orientado a contenido estático      |
| **Componente**      | Archivo `.astro` reutilizable                     |
| **Layout**          | Componente que envuelve páginas                   |
| **Colección**       | Grupo de archivos `.md` con esquema común         |
| **Frontmatter**     | Metadatos en la cabecera de un `.md`              |
| **Schema**          | Definición de campos y tipos de una colección     |
| **Slot**            | Hueco donde se inyecta contenido en un Layout     |
| **Scoped CSS**      | Estilos aislados a un componente                  |
| **Loader**          | Mecanismo que lee archivos para una colección     |
| **Slug / ID**       | Identificador de una entrada (nombre del archivo) |
| **Build**           | Proceso de generar el sitio estático final        |
| **Commit**          | Punto de guardado en Git                          |
| **Rama (branch)**   | Línea de desarrollo paralela en Git               |
| **Remoto (remote)** | Repositorio en servidor (GitHub)                  |
| **Mirror**          | Servidor espejo de un registro (npm)              |

### D. Recursos

- Documentación de Astro: https://docs.astro.build
- Content Collections: https://docs.astro.build/en/guides/content-collections/
- Layouts: https://docs.astro.build/en/basics/layouts/
- Git: https://git-scm.com/doc
- Markdown: https://www.markdownguide.org/
- Pandoc (conversión a .docx): https://pandoc.org/

### E. Conversión a DOCX

```bash
sudo apt install pandoc
cd ~/Proyectos/museo-web
pandoc DOCUMENTACION.md -o DOCUMENTACION.docx
```

Abrir con LibreOffice Writer.

---

**Fin de la documentación.**