import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const salas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/salas' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagen_principal: z.string(),
    ponentes: z.array(z.string()).optional(),
  }),
});

const ponentes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ponentes' }),
  schema: z.object({
    nombre: z.string(),
    bio: z.string(),
    foto: z.string(),
    especialidad: z.string().optional(),
  }),
});

export const collections = { salas, ponentes };