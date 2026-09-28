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

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.string(),
    resumen: z.string(),
    imagen: z.string().optional(),
    autor: z.string().optional(),
  }),
});

const eventos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventos' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.string(),
    descripcion: z.string(),
    imagen: z.string().optional(),
    lugar: z.string().optional(),
  }),
});

export const collections = { salas, contactos, noticias, eventos };