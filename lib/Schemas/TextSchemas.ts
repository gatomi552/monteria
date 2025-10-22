import z from 'zod';

const emailSchema = z
    .string()
    .min(1,{message: 'El email es requerido'})
    .email("Por favor, ingresa un email válido.");