# Documentación del Proyecto Museo Web

**Autor:** Creafter770
**Repositorio:** https://github.com/Creafter770/museo-web
**Descripción:** Página estática para el Museo Municipal "19 de Diciembre", Caimanera.
**Stack:** Astro 7.3.5 + Node.js 22 + TypeScript + Git + GitHub Pages
**Fecha de inicio:** Septiembre 25/2026
**Última actualización:** Septiembre 28/2026

---

## Índice

1. [Introducción](#1-introducción)
2. [Entorno de desarrollo](#2-entorno-de-desarrollo)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Arquitectura: cómo se conecta todo](#4-arquitectura-cómo-se-conecta-todo)
5. [Documentación de archivos](#5-documentación-de-archivos)
6. [Sintaxis de Astro](#6-sintaxis-de-astro)
7. [Diseño responsive y accesibilidad](#7-diseño-responsive-y-accesibilidad)
8. [Flujo de trabajo con Git](#8-flujo-de-trabajo-con-git)
9. [Despliegue en GitHub Pages](#9-despliegue-en-github-pages)
10. [Solución de problemas](#10-solución-de-problemas)
11. [Notas para el contexto cubano](#11-notas-para-el-contexto-cubano)
12. [Requisitos legales y gubernamentales](#12-requisitos-legales-y-gubernamentales)
13. [Anexos](#13-anexos)

---

## 1. Introducción

### 1.1 Propósito del proyecto

Sitio web estático que documenta las salas, secciones, contactos e información general del Museo Municipal "19 de Diciembre" de Caimanera. El objetivo es ofrecer una experiencia informativa, visual y accesible incluso en conexiones lentas, optimizada para dispositivos móviles.

### 1.2 ¿Por qué Astro?

Astro es un framework web orientado al contenido que genera HTML estático. Sus ventajas:

- **Cero JavaScript por defecto:** el navegador no ejecuta código innecesario.
- **Rápido en conexiones lentas:** ideal para el contexto cubano.
- **Hosting gratuito:** se puede alojar en GitHub Pages, Netlify o cualquier servidor estático.
- **Content Collections:** permite escribir contenido en Markdown y validarlo con esquemas.
- **Componentes reutilizables:** mantiene el código limpio y escalable.

### 1.3 Conceptos previos

- **Markdown (`.md`):** lenguaje de marcado ligero para escribir contenido con formato.
- **Frontmatter:** bloque entre `---` al inicio de un `.md` con datos estructurados.
- **Componente:** pieza reutilizable de UI (archivo `.astro`).
- **Layout:** plantilla que envuelve páginas con estructura común.
- **Colección:** grupo de archivos `.md` con la misma estructura.
- **Drawer:** panel lateral deslizante (menú móvil).
- **Media query:** regla CSS condicional según el tamaño de pantalla.

---

## 2. Entorno de desarrollo

### 2.1 Requisitos

| Herramienta | Versión | Propósito             |
|-------------|---------|-----------------------|
| Linux Mint  | 21+     | Sistema operativo     |
| Node.js     | 22.x    | Runtime de JavaScript |
| npm         | 10.x+   | Gestor de paquetes    |
| Git         | 2.x     | Control de versiones  |
| VS Code     | Última  | Editor de código      |
| Astro       | 7.3.5   | Framework web         |

### 2.2 Instalación de Node.js 22 (método NVM)

```bash
sudo apt update
sudo apt install -y curl build-essential
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
source ~/.bashrc
nvm install 22
nvm alias default 22
node -v   # v22.x.x
npm -v    # 10.x.x
```

### 2.3 Extensiones de VS Code recomendadas

| Extensión         | Función                                 |
|-------------------|-----------------------------------------|
| Astro             | Resaltado y autocompletado en `.astro`  |
| Prettier          | Formateo automático de código           |
| ESLint            | Detección de errores                    |
| GitLens           | Información de Git en el editor         |
| Error Lens        | Errores visibles junto a la línea       |
| Auto Rename Tag   | Renombrado automático de etiquetas HTML |
| Path Intellisense | Autocompletado de rutas de archivos     |
| Better Comments   | Comentarios con colores                 |
| TODO Tree         | Panel con tareas pendientes             |
| Git Graph         | Visualización del historial de Git      |

### 2.4 Crear el proyecto

```bash
cd ~/Proyectos
npm Creafter astro@latest
# - Nombre: museo-web
# - Plantilla: Empty
# - Instalar dependencias: Yes
# - Inicializar Git: Yes
# - TypeScript: Yes
```

### 2.5 Configuración de npm para Cuba

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
├── public/                      # Archivos estáticos
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
│   │   ├── sobre.astro          # /sobre
│   │   ├── servicios.astro      # /servicios
│   │   ├── normativa.astro      # /normativa
│   │   ├── transparencia.astro  # /transparencia
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

**Páginas estáticas vs. dinámicas:**

| Tipo | Archivo | URL | Cuándo usar |
|---|---|---|---|
| Estática | `sobre.astro` | `/sobre` | Contenido único, sin variantes |
| Dinámica | `salas/[slug].astro` | `/salas/:id` | Contenido generado desde `.md` |

---

## 4. Arquitectura: cómo se conecta todo

### 4.1 La cadena de datos

```
src/content.config.ts
  → Declara dónde viven los .md y qué campos tienen
        │
        ▼
src/content/<coleccion>/*.md
  → Contenido real: frontmatter + cuerpo Markdown
        │
        │ getCollection('nombre')
        ▼
Array de entradas: [{id, data, body}, ...]
        │
        ├──► index.astro:      .map() + Card
        └──► [slug].astro:     getStaticPaths() + render()
                │
                ▼
        BaseLayout.astro
        <slot />
                │
                ▼
        HTML estático final
        + CSS global + CSS scoped
```

### 4.2 Los tres eslabones clave

**Eslabón 1 — `content.config.ts`**

```typescript
loader: glob({ pattern: '**/*.md', base: './src/content/salas' })
```

**Esta es la única línea del proyecto que sabe dónde están los `.md`.**

**Eslabón 2 — `getCollection('salas')`**

Las páginas nunca tocan el sistema de archivos. Piden al sistema por el **nombre lógico** de la colección.

**Eslabón 3 — `getStaticPaths()`**

Genera una ruta por cada entrada. El **nombre del archivo** se convierte en el **`id`**, y el `id` en la URL.

- `sala1.md` → `/salas/sala1`
- `director.md` → `/contactos/director`

### 4.3 Regla del `slug` vs `id`

- En Astro 4 y anteriores, se usaba `entry.slug`.
- En Astro 5+ (incluido 7), se usa `entry.id`.

El `id` es el nombre del archivo sin extensión.

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

| Línea                                    | Qué hace                                             |
|------------------------------------------|------------------------------------------------------|
| `import { defineCollection, z }`         | Importa el creador de colecciones y el validador Zod |
| `import { glob }`                        | Importa el cargador de archivos por patrón           |
| `const salas = defineCollection({...})`  | Crea la colección `salas`                            |
| `loader: glob({...})`                    | Le dice dónde buscar los archivos                    |
| `pattern: '**/*.md'`                     | Filtro: cualquier `.md` en cualquier subcarpeta      |
| `base: './src/content/salas'`            | Carpeta raíz de búsqueda                             |
| `schema: z.object({...})`                | Define los campos obligatorios/opcionales            |
| `z.string()`                             | Campo obligatorio de tipo texto                      |
| `.optional()`                            | Campo opcional                                       |
| `export const collections = {...}`       | Expone las colecciones al resto del proyecto         |

**Cómo añadir una nueva colección:**

1. Añadir el `defineCollection` correspondiente.
2. Añadirlo al `export const collections`.

### 5.2 `src/layouts/BaseLayout.astro`

**Propósito:** Plantilla HTML común a todas las páginas. Incluye el header con menú responsive (drawer lateral) y el footer.

**Props:**
- `title: string` — el título de la página.

**Estructura:**

El layout contiene **cuatro bloques principales**:

1. **`<header>`** con logo, menú de escritorio y botón hamburguesa.
2. **`<div class="overlay">`** — capa oscura que cubre la pantalla cuando el drawer está abierto.
3. **`<aside class="drawer">`** — panel lateral con los enlaces de navegación.
4. **`<main>`** con `<slot />` y **`<footer>`**.
5. **`<script>`** al final para controlar el drawer (abrir/cerrar).

**Explicación de las tres formas de cerrar el drawer:**

1. **Clic en un enlace** → navega y cierra automáticamente.
2. **Clic en la X** (`.drawer-cerrar`) → cierra.
3. **Clic en el overlay** → cierra.

**Puntos clave:**
- `<slot />` es el hueco donde se inyecta el contenido de cada página.
- El CSS global se importa una sola vez aquí.
- El `<script>` es la única pieza de JavaScript del sitio. Se ejecuta en el cliente.
- `document.body.style.overflow = 'hidden'` bloquea el scroll del fondo cuando el drawer está abierto.

### 5.3 `src/components/Card.astro`

**Propósito:** Tarjeta reutilizable para mostrar salas o contactos en un listado.

**Props:**
- `titulo: string` (obligatorio)
- `descripcion: string` (obligatorio)
- `imagen?: string` (opcional)
- `href: string` (obligatorio)

**Puntos clave:**
- `{imagen && <img ... />}` es renderizado condicional.
- Los estilos dentro de `<style>` están scoped.
- El elemento es un `<a>` completo, mejor para móviles.
- Efecto hover: la tarjeta se eleva (`transform: translateY(-4px)`) y la sombra crece.

### 5.4 `src/pages/index.astro`

**Propósito:** Página de inicio.

**URL:** `/`

**Contenido:** Bienvenida + lista de enlaces a todas las secciones principales.

### 5.5 `src/pages/sobre.astro`

**Propósito:** Información institucional del museo.

**URL:** `/sobre`

**Contenido:**
- Misión
- Visión
- Funciones (según la Gaceta Oficial)

**Clase CSS:** `.pagina-estatica` (definida en `global.css`).

### 5.6 `src/pages/servicios.astro`

**Propósito:** Catálogo de servicios ofrecidos por el museo.

**URL:** `/servicios`

**Contenido:**
- Visita guiada: precio 5 CUP por persona. Botón "Pagar con Transfermóvil" (placeholder).
- Talleres educativos.
- Nota sobre formas de pago (Transfermóvil + efectivo en taquilla).

**Clases CSS usadas:** `.servicios-grid`, `.servicio-card`, `.precio`, `.boton-pago`, `.nota-pago`.

**Integración con Transfermóvil (pendiente):**

El `href` del botón es actualmente `#`. Cuando el museo contrate el servicio de tienda virtual con ETECSA (Bulevar Mi Transfer), se reemplazará por la URL real de la pasarela.

**Diferencia entre QR estático y QR dinámico:**

| Tipo | Cómo funciona | Cuándo usarlo |
|---|---|---|
| QR estático | Imagen fija con la cuenta del museo. El usuario escribe el monto manualmente. | Taquilla presencial |
| QR dinámico | Se genera por transacción, con el monto pre-cargado. | Tienda virtual, pagos en línea |

### 5.7 `src/pages/normativa.astro`

**Propósito:** Marco legal que rige al museo.

**URL:** `/normativa`

**Contenido:**
- Ley 23 de Museos Municipales.
- Ley 162/2023 de Comunicación Social.
- Ley 168 de Transparencia y Acceso a la Información Pública.
- Resolución 93/2023 del MINCIN sobre pagos electrónicos.

### 5.8 `src/pages/transparencia.astro`

**Propósito:** Información pública del museo.

**URL:** `/transparencia`

**Contenido:**
- Directorio institucional (director, correo, teléfono).
- Planificación de actividades.

### 5.9 `src/pages/salas/index.astro` y `[slug].astro`

**Propósito:** Listado y detalle de las salas.

**URLs:** `/salas` y `/salas/:id`

Patrón de colección dinámica ya documentado en la sección 4.

### 5.10 `src/pages/contactos/index.astro` y `[slug].astro`

**Propósito:** Listado y detalle de los contactos.

**URLs:** `/contactos` y `/contactos/:id`

Mismos patrones que las salas, adaptados a la colección `contactos`.

### 5.11 `src/content/salas/*.md`

**Ejemplo de frontmatter:**

```markdown
---
titulo: "Sala de Historia"
descripcion: "Recorre los primeros años del museo."
imagen_principal: "/museo-web/imagenes/salas/historia.jpg"
---
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

### 5.12 `src/styles/global.css`

**Propósito:** Estilos globales compartidos por todo el sitio.

**Secciones del archivo:**

1. **Variables CSS** (`:root`) — colores, tipografías.
2. **Reset básico** — `body`, `h1`, `h2`, `h3`.
3. **Header** — logo, menú desktop, botón hamburguesa.
4. **Overlay** — capa oscura.
5. **Drawer** — panel lateral con cabecera, botón X y nav.
6. **Main y Footer**.
7. **Páginas estáticas** — `.pagina-estatica`.
8. **Botones** — `.boton-pago` con hover y active.
9. **Servicios** — grid, cards, precio, nota.
10. **Media query** (`max-width: 768px`) — estilos móviles.

**Regla de uso:**

- Si un estilo se repite en 2+ archivos → `global.css`.
- Si es único de una página → `<style>` local.

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

### 6.9 JavaScript en el cliente

Aunque Astro es "cero JavaScript por defecto", se puede añadir `<script>` en cualquier `.astro`. Astro lo empaqueta y lo envía al navegador.

```astro
<script>
  const elemento = document.getElementById('mi-id');
  elemento?.addEventListener('click', () => {
    // ...
  });
</script>
```

**Buenas prácticas:**

- Usar `?.` (optional chaining) para evitar errores si el elemento no existe.
- Minimizar el código de cliente. Solo lo imprescindible.
- No usar librerías grandes para cosas pequeñas.

---

## 7. Diseño responsive y accesibilidad

### 7.1 Concepto: Mobile-first vs Desktop-first

| Enfoque | Cómo se escribe | Cuándo usarlo |
|---|---|---|
| Mobile-first | Estilos base para móvil + `@media (min-width: 768px)` para ampliar | Recomendado |
| Desktop-first | Estilos base para escritorio + `@media (max-width: 768px)` para reducir | Clásico, fácil de migrar |

**Este proyecto usa Desktop-first** por simplicidad de migración.

### 7.2 La meta tag viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Sin esta etiqueta, los celulares simulan una pantalla de 980px y reducen todo.**

### 7.3 Media queries

```css
@media (max-width: 768px) {
  /* Reglas que solo aplican cuando el ancho es ≤ 768px */
}
```

**Breakpoints comunes:**

| Ancho | Dispositivo |
|---|---|
| 320px | Móvil pequeño |
| 480px | Móvil grande |
| 768px | Tablet vertical |
| 1024px | Tablet horizontal |
| 1200px | Escritorio |

### 7.4 Patrón: Drawer lateral

El menú móvil es un **drawer** que se desliza desde la derecha. Los componentes:

| Elemento | Función |
|---|---|
| `.menu-boton` | Botón hamburguesa (visible solo en móvil) |
| `.overlay` | Capa oscura que cubre la pantalla |
| `.drawer` | Panel lateral con enlaces |
| `.drawer-cerrar` | Botón X dentro del drawer |

**Cómo funciona la animación:**

```css
.drawer {
  right: -260px;                    /* Cerrado: fuera de pantalla */
  transition: right 0.3s ease;
}
.drawer.activo {
  right: 0;                          /* Abierto: en pantalla */
}
```

JavaScript añade/quita la clase `.activo` al hacer clic.

**Regla importante:** `right` debe ser **ligeramente mayor** que `width`. Si `width = 240px`, `right = -260px`. Así el drawer queda completamente fuera al cerrar.

### 7.5 Bloqueo de scroll

```javascript
document.body.style.overflow = 'hidden';
```

Cuando el drawer está abierto, esta línea impide que el usuario haga scroll de la página de fondo. Al cerrar, se restaura con `''`.

### 7.6 Accesibilidad

- **`aria-label`** en botones sin texto visible.
- **`aria-hidden`** en el drawer cuando está cerrado.
- **Contraste adecuado:** texto blanco sobre fondo tierra cumple AA.
- **Navegación por teclado:** los `<button>` reales son accesibles por defecto.
- **Tamaño de toque:** botones de al menos 44x44px en móvil.

### 7.7 Botones con hover

```css
.boton-pago {
  background-color: var(--color-acento);
  transition: background-color 0.2s ease;
}
.boton-pago:hover {
  background-color: #6b4529;   /* 20% más oscuro */
}
.boton-pago:active {
  background-color: #4a2f1c;   /* 40% más oscuro */
}
```

**Regla:** elegir 1-2 efectos por botón. No combinar todos.

---

## 8. Flujo de trabajo con Git

### 8.1 Configuración inicial

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 8.2 Comandos básicos

| Comando | Función |
|---|---|
| `git status` | Ver estado del working directory |
| `git add .` | Preparar todos los cambios |
| `git commit -m "mensaje"` | Guardar un punto de control |
| `git log --oneline` | Ver historial resumido |
| `git branch` | Ver ramas locales |
| `git branch -a` | Ver ramas locales y remotas |

### 8.3 Flujo de ramas

```bash
git checkout main
git pull
git checkout -b nueva-funcionalidad
# ... trabajar ...
git add .
git commit -m "Descripción del cambio"
git checkout main
git merge nueva-funcionalidad
git push
git branch -d nueva-funcionalidad
git push origin --delete nueva-funcionalidad
```

### 8.4 Deshacer cambios

| Escenario                         | Comando                   |
|-----------------------------------|---------------------------|
| Descartar cambios sin commit      | `git checkout -- archivo` |
| Deshacer commit, mantener cambios | `git reset --soft HEAD~1` |
| Deshacer commit y perder cambios  | `git reset --hard HEAD~1` |
| Guardar cambios temporalmente     | `git stash push -m "msg"` |
| Recuperar cambios guardados       | `git stash pop`           |

### 8.5 Comandos correctos vs incorrectos

| Quiero... | Comando correcto | Comando incorrecto |
|---|---|---|
| Cambiar de rama | `git checkout main` | `git checkout -d ...` |
| Borrar rama | `git branch -d nombre` | `git checkout -d nombre` |
| Crear rama nueva | `git checkout -b nombre` | (ese `-b` sí es correcto) |

**Regla mental:**
- **`branch`** → gestión de ramas (crear, listar, borrar).
- **`checkout`** → cambiar de dónde estás parado.

### 8.6 Autenticación con GitHub

GitHub ya no acepta contraseñas. Se necesita un **Personal Access Token (PAT)**.

**Crear el token:**

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic).
2. Generate new token (classic).
3. Nombre: `museo-web-push`, Expiración: 90 días, Scope: `repo`.
4. Copiar el token (`ghp_...`) y guardarlo.

**Usarlo en el push:**
- Username: tu usuario de GitHub.
- Password: pega el token.

### 8.7 Conectar repositorio local con GitHub

```bash
git branch -M main
git remote add origin https://github.com/Creafter770/museo-web.git
git fetch origin
git rebase origin/main
git push -u origin main
```

---

## 9. Despliegue en GitHub Pages

### 9.1 Configurar Astro

En `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Creafter770.github.io',
  base: '/museo-web',
});
```

### 9.2 Activar GitHub Pages

1. En el repositorio de GitHub: Settings → Pages.
2. Source: **GitHub Actions**.
3. GitHub detecta Astro y configura el workflow automáticamente.

### 9.3 URL final

`https://Creafter770.github.io/museo-web/`

---

## 10. Solución de problemas

### 10.1 Errores comunes

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
| Franja visible al cerrar drawer | `right` menor que `width`             | Ajustar: `right = width + 20px`   |

### 10.2 Cambios de API en Astro

Astro 4 → Astro 5+ cambiaron la API de Content Collections. Si un tutorial antiguo no funciona:

- `type: 'content'` → `loader: glob(...)`
- `entry.slug` → `entry.id`
- `await entry.render()` → `render(entry)` (función importada)

**Siempre consultar la documentación oficial de la versión instalada.**

### 10.3 Verificar la versión de Astro

```bash
npm list astro
cat package.json | grep astro
```

### 10.4 El error "cannot find module" tras un rebase

```bash
git status
ls src/components/
```

Suele ser porque la rama no tenía ese archivo.

### 10.5 El truco de diagnosticar con la consola

Abre DevTools (`F12`) → pestaña **Console**. Cualquier error de JavaScript aparece aquí. Es lo primero que revisar cuando algo deja de funcionar.

---

## 11. Notas para el contexto cubano

### 11.1 Mirrors de npm

```bash
npm config set registry https://mirrors.cloud.tencent.com/npm/
npm config get registry
```

### 11.2 Timeouts de red

```bash
npm config set fetch-retry-maxtimeout 600000
npm config set fetch-timeout 600000
```

### 11.3 VPN para Git

Si el push falla por inestabilidad:

1. Activar Proton VPN.
2. Reintentar `git push`.
3. Borrar proxy de Git: `git config --global --unset http.proxy`.

### 11.4 Optimización de imágenes

Crítico en Cuba por el ancho de banda limitado:

- Convertir a **WebP**.
- Redimensionar a máximo 1600px de ancho.
- Objetivo: menos de 200KB por imagen.
- Usar lazy loading.

### 11.5 GitLens y Cuba

GitLens funciona sin VPN para funciones locales. Para iniciar sesión con GitKraken y usar funciones avanzadas, sí se necesita VPN.

---

## 12. Requisitos legales y gubernamentales

### 12.1 Marco normativo cubano

Un museo municipal es una **institución estatal**. El sitio web debe cumplir con la normativa vigente:

| Norma | Contenido |
|---|---|
| Ley 162/2023 | De Comunicación Social. Registro obligatorio de sitios web de entidades estatales. |
| Ley 168 | De Transparencia y Acceso a la Información Pública. |
| Ley 23 | De Museos Municipales. Define las funciones del museo. |
| Resolución 93/2023 (MINCIN) | Obligatoriedad de ofrecer canales de pago electrónico. |

### 12.2 Registro del sitio web

Todo sitio web de entidad estatal debe registrarse en el **Registro Nacional de Sitios Web** del Instituto de Información y Comunicación Social (ICS). El trámite lo gestiona el museo, no el desarrollador, pero el desarrollador debe conocerlo.

### 12.3 Pasarela de pago (Transfermóvil)

**Requisitos para el museo:**

- Estar inscrito en el Registro Central Comercial (RCC).
- Tener línea móvil corporativa.
- Correo con dominio `.cu`.
- Certificado legal que acredite su constitución.

**Servicio:** Bulevar Mi Transfer de ETECSA ofrece el módulo de "Tienda Virtual" que permite integración con sitios web.

**Lo que el museo recibe al contratar:**

- URL de pago para poner en el `href` del botón.
- QR dinámico generado por transacción.
- Panel de administración de pagos.
- Notificaciones de pago.

**Lo que NO se debe hacer:**

- Manejar datos de tarjetas en el frontend.
- Guardar credenciales bancarias.
- Procesar pagos sin la pasarela oficial.

### 12.4 Secciones mínimas obligatorias

Basado en la normativa:

| Sección | Estado |
|---|---|
| Inicio | ✅ Implementado |
| Sobre el Museo (misión, visión, funciones) | ✅ Implementado |
| Salas | ✅ Implementado |
| Contactos (directorio institucional) | ✅ Implementado |
| Servicios (catálogo) | ✅ Implementado |
| Marco Normativo | ✅ Implementado |
| Transparencia | ✅ Implementado |
| Eventos / Actividades | ⏳ Pendiente (Fase 2) |
| Noticias | ⏳ Pendiente (Fase 2) |
| Accesibilidad | ⏳ Pendiente (Fase 3) |
| Privacidad | ⏳ Pendiente (Fase 3) |
| Mapa del sitio | ⏳ Pendiente (Fase 3) |

---

## 13. Anexos

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

| Archivo                          | URL              |
|----------------------------------|------------------|
| `pages/index.astro`              | `/`              |
| `pages/sobre.astro`              | `/sobre`         |
| `pages/servicios.astro`          | `/servicios`     |
| `pages/normativa.astro`          | `/normativa`     |
| `pages/transparencia.astro`      | `/transparencia` |
| `pages/salas/index.astro`        | `/salas`         |
| `pages/salas/[slug].astro`       | `/salas/:id`     |
| `pages/contactos/index.astro`    | `/contactos`     |
| `pages/contactos/[slug].astro`   | `/contactos/:id` |

### C. Glosario

| Término             | Definición                                         |
|---------------------|----------------------------------------------------|
| **Astro**           | Framework web orientado a contenido estático       |
| **Componente**      | Archivo `.astro` reutilizable                      |
| **Layout**          | Componente que envuelve páginas                    |
| **Colección**       | Grupo de archivos `.md` con esquema común          |
| **Frontmatter**     | Metadatos en la cabecera de un `.md`               |
| **Schema**          | Definición de campos y tipos de una colección      |
| **Slot**            | Hueco donde se inyecta contenido en un Layout      |
| **Scoped CSS**      | Estilos aislados a un componente                   |
| **Loader**          | Mecanismo que lee archivos para una colección      |
| **Slug / ID**       | Identificador de una entrada (nombre del archivo)  |
| **Build**           | Proceso de generar el sitio estático final         |
| **Commit**          | Punto de guardado en Git                           |
| **Rama (branch)**   | Línea de desarrollo paralela en Git                |
| **Remoto (remote)** | Repositorio en servidor (GitHub)                   |
| **Mirror**          | Servidor espejo de un registro (npm)               |
| **Drawer**          | Panel lateral deslizante (menú móvil)              |
| **Overlay**         | Capa oscura que cubre la pantalla                  |
| **Media query**     | Regla CSS condicional según tamaño de pantalla     |
| **Mobile-first**    | Enfoque de diseño que prioriza móvil               |
| **Transfermóvil**   | Plataforma cubana de pagos electrónicos            |
| **Bulevar Mi Transfer** | Servicio de ETECSA para tiendas virtuales      |
| **PAT**             | Personal Access Token (autenticación GitHub)       |

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

### F. Fases del proyecto

**Fase 1 (completada):**
- Páginas estáticas institucionales: sobre, servicios, normativa, transparencia.
- Menú responsive con drawer lateral.
- Optimización para móvil.

**Fase 2 (pendiente):**
- Noticias (colección dinámica).
- Eventos (colección o página con lista).

**Fase 3 (pendiente):**
- Accesibilidad, privacidad, mapa del sitio.
- Integración con pasarela de Transfermóvil.
- Sistema de acceso a salas virtuales (paywall).

---

**Fin de la documentación.**